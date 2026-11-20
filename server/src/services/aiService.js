/**
 * AI Service for Smart Tourism Guide
 *
 * Supports two providers:
 * - "openai": calls a real OpenAI-compatible LLM
 * - "mock": returns realistic travel responses without any API key
 *
 * To use a real LLM, set AI_PROVIDER=openai and OPENAI_API_KEY in .env
 */

const { OpenAI } = require('openai');

const PROVIDER = process.env.AI_PROVIDER || 'mock';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || undefined;

let openai = null;
if (PROVIDER === 'openai' && OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    baseURL: OPENAI_BASE_URL,
  });
}

/**
 * System prompt that shapes the AI into a helpful tourism guide.
 */
const SYSTEM_PROMPT = `You are SmartGuide, an expert AI travel assistant for a smart tourism webapp.
Help users plan trips, discover destinations, and get local travel tips.
Be friendly, concise, and practical. When suggesting itineraries, include:
- Morning / afternoon / evening activities
- Approximate durations
- Estimated costs (budget / mid-range / luxury)
- Food recommendations
- Travel tips (best time to visit, local customs, transport)

Always format itineraries clearly with bullet points and day headings.
If the user asks for something unsafe, illegal, or harmful, decline politely.`;

/**
 * Generate a chat completion.
 * @param {Array} messages - Array of { role, content }
 * @param {Object} options - { temperature, maxTokens }
 * @returns {Promise<string>}
 */
async function chatCompletion(messages, options = {}) {
  const { temperature = 0.7, maxTokens = 1000 } = options;

  if (PROVIDER === 'openai' && openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature,
        max_tokens: maxTokens,
      });
      return completion.choices[0].message.content;
    } catch (err) {
      console.error('OpenAI error:', err.message);
      // Fall back to mock on failure
      return mockCompletion(messages);
    }
  }

  return mockCompletion(messages);
}

/**
 * Mock AI that returns realistic travel responses without an API key.
 * Useful for demos, offline development, and testing.
 */
function mockCompletion(messages) {
  const lastUser = messages
    .slice()
    .reverse()
    .find((m) => m.role === 'user');
  const userText = (lastUser && lastUser.content) || '';
  const lower = userText.toLowerCase();

  // Itinerary requests
  if (lower.includes('itinerary') || lower.includes('plan') || lower.includes('day')) {
    const daysMatch = userText.match(/(\d+)\s*-?\s*day/i);
    const days = daysMatch ? Math.min(Math.max(parseInt(daysMatch[1], 10), 1), 14) : 3;
    const destination = extractDestination(userText) || 'your destination';
    return generateMockItinerary(destination, days);
  }

  // Destination recommendations
  if (
    lower.includes('recommend') ||
    lower.includes('suggest') ||
    lower.includes('where should') ||
    lower.includes('best place')
  ) {
    return generateMockRecommendations(lower);
  }

  // Packing
  if (lower.includes('pack') || lower.includes('packing')) {
    return `🎒 Packing essentials for your trip:\n\n• Comfortable walking shoes\n• Weather-appropriate clothing (layers)\n• Travel adapter & power bank\n• Toiletries & medications\n• Copies of ID / passport / booking confirmations\n• Reusable water bottle\n• Daypack for excursions\n• Sunscreen & sunglasses\n\nPro tip: Roll your clothes to save space and check the local weather forecast before you pack.`;
  }

  // Budget / cost
  if (lower.includes('budget') || lower.includes('cost') || lower.includes('expensive')) {
    return `💰 Budgeting tips for travelers:\n\n• Travel in shoulder season for lower prices\n• Book accommodation and transport 4–8 weeks ahead\n• Eat where locals eat (street food & markets)\n• Use public transport or walk when possible\n• Set a daily spending limit and track expenses\n• Look for free walking tours and museum free-days\n\nWould you like a cost estimate for a specific destination?`;
  }

  // General / greeting
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
    return `Hello! I'm SmartGuide, your AI travel assistant. ✈️\n\nI can help you with:\n• Creating personalized day-by-day itineraries\n• Recommending destinations based on your interests\n• Answering questions about weather, food, and local customs\n• Packing and budgeting advice\n\nWhere would you like to go, or what would you like to plan?`;
  }

  // Default helpful response
  return `That's a great travel question! I'm here to help you plan your trip. Could you tell me a bit more about:

1. Which destination(s) interest you?
2. How many days will you be traveling?
3. What do you enjoy most (culture, nature, food, adventure, relaxation)?
4. Your rough budget level (budget / mid-range / luxury)?

With those details, I can build you a personalized itinerary.`;
}

function extractDestination(text) {
  const known = [
    'paris', 'tokyo', 'new york', 'london', 'bali', 'rome', 'bangkok',
    'barcelona', 'sydney', 'dubai', 'istanbul', 'marrakech', 'kyoto',
    'santorini', 'cape town', 'rio de janeiro', 'vancouver', 'berlin',
  ];
  const lower = text.toLowerCase();
  for (const city of known) {
    if (lower.includes(city)) return city.charAt(0).toUpperCase() + city.slice(1);
  }
  return null;
}

function generateMockItinerary(destination, days) {
  const morning = ['Visit the historic old town', 'Explore the local market', 'Take a guided walking tour', 'Watch the sunrise at the waterfront'];
  const afternoon = ['Visit a famous museum', 'Lunch at a highly-rated local restaurant', 'Hike a scenic trail', 'Take a boat tour'];
  const evening = ['Dinner at a rooftop restaurant', 'Enjoy live local music', 'Stroll through the illuminated city center', 'Relax at a local café'];

  let result = `🗓️ ${days}-Day Itinerary for ${destination}\n\n`;
  result += `Here's a personalized plan for your trip to ${destination}. Adjust activities based on your pace and interests.\n\n`;

  for (let d = 1; d <= days; d++) {
    result += `**Day ${d}**\n`;
    result += `• Morning: ${morning[d % morning.length]}\n`;
    result += `• Afternoon: ${afternoon[d % afternoon.length]}\n`;
    result += `• Evening: ${evening[d % evening.length]}\n`;
    result += `• Meal suggestion: Try a local specialty dish\n`;
    result += `• Estimated cost: Mid-range ($$)\n\n`;
  }

  result += `💡 Tips:\n• Start early to avoid crowds at popular sites\n• Book tickets for top attractions in advance\n• Keep a copy of your reservation confirmations\n\nEnjoy your trip to ${destination}!`;
  return result;
}

function generateMockRecommendations(lower) {
  const recommendations = [
    { name: 'Kyoto, Japan', why: 'Temples, cherry blossoms, and traditional tea houses — perfect for culture lovers.', budget: 'Mid-range' },
    { name: 'Bali, Indonesia', why: 'Tropical beaches, rice terraces, and wellness retreats ideal for relaxation.', budget: 'Budget' },
    { name: 'Barcelona, Spain', why: 'Stunning Gaudí architecture, tapas, and a vibrant Mediterranean lifestyle.', budget: 'Mid-range' },
    { name: 'Queenstown, New Zealand', why: 'Adventure capital — bungee jumping, skiing, and breathtaking alpine scenery.', budget: 'Luxury' },
    { name: 'Marrakech, Morocco', why: 'Colorful souks, historic palaces, and aromatic Moroccan cuisine.', budget: 'Budget' },
    { name: 'Reykjavik, Iceland', why: 'Northern lights, geothermal pools, and dramatic volcanic landscapes.', budget: 'Luxury' },
  ];

  let result = '🌍 Destination Recommendations\n\n';
  for (const rec of recommendations) {
    result += `• ${rec.name} (${rec.budget})\n  ${rec.why}\n\n`;
  }
  result += 'Tell me your interests and travel dates, and I can narrow this down further!';
  return result;
}

module.exports = { chatCompletion, SYSTEM_PROMPT };
