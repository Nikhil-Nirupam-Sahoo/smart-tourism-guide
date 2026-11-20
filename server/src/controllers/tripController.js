const asyncHandler = require('express-async-handler');
const {
  createTrip: dbCreateTrip,
  findTrips,
  findTripById,
  findDestinationById,
  updateTripById,
  deleteTripById,
} = require('../db');
const { chatCompletion } = require('../services/aiService');

/**
 * @desc    Get all trips for the logged-in user
 * @route   GET /api/trips
 * @access  Private
 */
const getMyTrips = asyncHandler(async (req, res) => {
  const trips = await findTrips({ user: req.user.id, isArchived: { $ne: true } }, { sort: { createdAt: -1 } });
  res.json(trips);
});

/**
 * @desc    Get a single trip by ID
 * @route   GET /api/trips/:id
 * @access  Private
 */
const getTripById = asyncHandler(async (req, res) => {
  const trip = await findTripById(req.params.id);
  if (!trip) {
    res.status(404);
    throw new Error('Trip not found');
  }
  // Only allow owner to view private trips
  const ownerId = trip.user && (trip.user._id || trip.user);
  if (ownerId !== req.user.id && !trip.isPublic) {
    res.status(403);
    throw new Error('Not authorized to view this trip');
  }
  res.json(trip);
});

/**
 * @desc    Create a new trip (optionally AI-generated itinerary)
 * @route   POST /api/trips
 * @access  Private
 */
const createTrip = asyncHandler(async (req, res) => {
  const {
    destination,
    title,
    startDate,
    endDate,
    durationDays,
    travelers,
    budgetLevel,
    interests,
    generateItinerary,
  } = req.body;

  if (!destination || !title || !durationDays) {
    res.status(400);
    throw new Error('Please provide destination, title, and durationDays');
  }

  // Verify destination exists
  const dest = await findDestinationById(destination);
  if (!dest) {
    res.status(404);
    throw new Error('Destination not found');
  }

  let itinerary = [];
  if (generateItinerary) {
    const aiResponse = await chatCompletion(
      [
        {
          role: 'user',
          content: `Create a ${durationDays}-day travel itinerary for ${dest.name}, ${dest.country}. ` +
            `Category: ${dest.category}. Budget level: ${budgetLevel || 'mid-range'}. ` +
            `Interests: ${(interests || []).join(', ') || 'general sightseeing'}. ` +
            `Travelers: ${travelers || 1}. ` +
            `Return a clear day-by-day plan with morning, afternoon, and evening activities.`,
        },
      ],
      { temperature: 0.7, maxTokens: 1500 }
    );
    itinerary = parseAiItinerary(aiResponse, durationDays);
  }

  const trip = await dbCreateTrip({
    user: req.user.id,
    destination,
    title,
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
    durationDays: Number(durationDays),
    travelers: Number(travelers) || 1,
    budgetLevel: budgetLevel || 'mid-range',
    interests: interests || [],
    itinerary,
    aiGenerated: Boolean(generateItinerary),
  });

  res.status(201).json(trip);
});

/**
 * @desc    Update a trip
 * @route   PUT /api/trips/:id
 * @access  Private
 */
const updateTrip = asyncHandler(async (req, res) => {
  const trip = await findTripById(req.params.id);
  if (!trip) {
    res.status(404);
    throw new Error('Trip not found');
  }
  const ownerId = trip.user && (trip.user._id || trip.user);
  if (ownerId !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to update this trip');
  }

  const allowedFields = [
    'title',
    'startDate',
    'endDate',
    'durationDays',
    'travelers',
    'budgetLevel',
    'interests',
    'itinerary',
    'isPublic',
    'isArchived',
  ];
  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const updated = await updateTripById(req.params.id, updates);
  res.json(updated);
});

/**
 * @desc    Delete a trip
 * @route   DELETE /api/trips/:id
 * @access  Private
 */
const deleteTrip = asyncHandler(async (req, res) => {
  const trip = await findTripById(req.params.id);
  if (!trip) {
    res.status(404);
    throw new Error('Trip not found');
  }
  const ownerId = trip.user && (trip.user._id || trip.user);
  if (ownerId !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to delete this trip');
  }
  await deleteTripById(req.params.id);
  res.json({ message: 'Trip removed' });
});

/**
 * Parse a free-form AI itinerary response into structured day plans.
 */
function parseAiItinerary(text, days) {
  const plan = [];
  // Split keeping the "**Day N**" header at the start of each block, then drop the intro.
  const dayBlocks = text.split(/(?=\*\*Day\s*\d+\*\*)/i).filter((b) => /\*\*Day\s*\d+\*\*/i.test(b));
  for (let i = 0; i < days && i < dayBlocks.length; i++) {
    const block = dayBlocks[i];
    const extract = (label) => {
      const match = block.match(new RegExp(`${label}:\\s*([^\\n•]+)`, 'i'));
      return match ? match[1].trim() : '';
    };
    plan.push({
      day: i + 1,
      title: `Day ${i + 1}`,
      morning: extract('Morning') || 'Explore the local area',
      afternoon: extract('Afternoon') || 'Visit a key attraction',
      evening: extract('Evening') || 'Enjoy local dining',
      notes: '',
      estimatedCost: '$$',
    });
  }
  if (plan.length === 0) {
    for (let i = 0; i < days; i++) {
      plan.push({
        day: i + 1,
        title: `Day ${i + 1}`,
        morning: 'Morning activity',
        afternoon: 'Afternoon activity',
        evening: 'Evening activity',
        notes: '',
        estimatedCost: '$$',
      });
    }
  }
  return plan;
}

module.exports = {
  getMyTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
};
