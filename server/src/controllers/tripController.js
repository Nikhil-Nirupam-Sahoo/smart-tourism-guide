const asyncHandler = require('express-async-handler');
const {
  createTrip: dbCreateTrip,
  findTrips,
  findTripById,
  findTripByShareToken,
  updateTripById,
  deleteTripById,
  findDestinationById,
  findUserById,
} = require('../db');
const { chatCompletion } = require('../services/aiService');

const getMyTrips = asyncHandler(async (req, res) => {
  const trips = await findTrips({ user: req.user.id, isArchived: { $ne: true } }, { sort: { createdAt: -1 } });
  res.json(trips);
});

const getTripById = asyncHandler(async (req, res) => {
  const trip = await findTripById(req.params.id);
  if (!trip) {
    res.status(404);
    throw new Error('Trip not found');
  }
  const ownerId = trip.user && (trip.user._id || trip.user);
  if (ownerId !== req.user.id && !trip.isPublic) {
    res.status(403);
    throw new Error('Not authorized to view this trip');
  }
  res.json(trip);
});

const getTripByShare = asyncHandler(async (req, res) => {
  const trip = await findTripByShareToken(req.params.token);
  if (!trip) {
    res.status(404);
    throw new Error('Trip not found or not public');
  }
  res.json(trip);
});

const createTrip = asyncHandler(async (req, res) => {
  const {
    destination, title, startDate, endDate, durationDays, travelers,
    budgetLevel, interests, generateItinerary,
  } = req.body;

  if (!destination || !title || !durationDays) {
    res.status(400);
    throw new Error('Please provide destination, title, and durationDays');
  }

  const dest = await findDestinationById(destination);
  if (!dest) {
    res.status(404);
    throw new Error('Destination not found');
  }

  let itinerary = [];
  if (generateItinerary) {
    const aiResponse = await chatCompletion(
      [{
        role: 'user',
        content: `Create a ${durationDays}-day travel itinerary for ${dest.name}, ${dest.country}. ` +
          `Category: ${dest.category}. Budget: ${budgetLevel || 'mid-range'}. ` +
          `Interests: ${(interests || []).join(', ') || 'general sightseeing'}. ` +
          `Travelers: ${travelers || 1}. Return day-by-day morning/afternoon/evening.`,
      }],
      { temperature: 0.7, maxTokens: 1500 }
    );
    itinerary = parseAiItinerary(aiResponse, durationDays);
  }

  const trip = await dbCreateTrip({
    user: req.user.id, destination, title,
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

const updateTrip = asyncHandler(async (req, res) => {
  const trip = await findTripById(req.params.id);
  if (!trip) {
    res.status(404);
    throw new Error('Trip not found');
  }
  const ownerId = trip.user && (trip.user._id || trip.user);
  if (ownerId !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized');
  }

  const allowed = ['title','startDate','endDate','durationDays','travelers','budgetLevel','interests','itinerary','isPublic'];
  const updates = {};
  allowed.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });
  const updated = await updateTripById(req.params.id, updates);
  res.json(updated);
});

const deleteTrip = asyncHandler(async (req, res) => {
  const trip = await findTripById(req.params.id);
  if (!trip) {
    res.status(404);
    throw new Error('Trip not found');
  }
  const ownerId = trip.user && (trip.user._id || trip.user);
  // Allow owner OR admin to delete
  if (ownerId !== req.user.id && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete this trip');
  }
  await deleteTripById(req.params.id);
  res.json({ message: 'Trip removed' });
});

function parseAiItinerary(text, days) {
  const plan = [];
  const dayBlocks = text.split(/(?=\*\*Day\s*\d+\*\*)/i).filter((b) => /\*\*Day\s*\d+\*\*/i.test(b));
  for (let i = 0; i < days && i < dayBlocks.length; i++) {
    const block = dayBlocks[i];
    const extract = (label) => {
      const m = block.match(new RegExp(`${label}:\\s*([^\\n•]+)`, 'i'));
      return m ? m[1].trim() : '';
    };
    plan.push({
      day: i + 1, title: `Day ${i + 1}`,
      morning: extract('Morning') || 'Explore the local area',
      afternoon: extract('Afternoon') || 'Visit a key attraction',
      evening: extract('Evening') || 'Enjoy local dining',
      notes: '', estimatedCost: '$$',
    });
  }
  if (plan.length === 0) {
    for (let i = 0; i < days; i++) {
      plan.push({ day: i + 1, title: `Day ${i + 1}`, morning: 'Morning activity', afternoon: 'Afternoon activity', evening: 'Evening activity', notes: '', estimatedCost: '$$' });
    }
  }
  return plan;
}

module.exports = { getMyTrips, getTripById, getTripByShare, createTrip, updateTrip, deleteTrip };
