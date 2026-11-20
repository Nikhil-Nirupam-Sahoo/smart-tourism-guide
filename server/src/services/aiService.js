/**
 * AI Service for Smart Tourism Guide
 * Supports "openai" (real LLM) or "mock" (fallback, no API key).
 * Set AI_PROVIDER=openai and OPENAI_API_KEY in .env to use real GPT.
 */

const { OpenAI } = require('openai');

const PROVIDER = process.env.AI_PROVIDER || 'mock';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || undefined;

let openai = null;
if (PROVIDER === 'openai' && OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: OPENAI_API_KEY, baseURL: OPENAI_BASE_URL });
}

const SYSTEM_PROMPT = `You are SmartGuide, an expert AI travel assistant.
Help users plan trips, discover destinations, and get local travel tips.
Be friendly, concise, practical. For itineraries include morning/afternoon/evening, durations, estimated costs, food, tips.
Format with day headings and bullet points. Decline unsafe/illegal requests politely.`;

/**
 * Generate a chat completion.
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
      return mockCompletion(messages);
    }
  }
  return mockCompletion(messages);
}

/**
 * Mock AI fallback (no API key required).
 */
const activityPool = {
  morning: [
    'Explore the historic old town on foot',
    'Visit the main cathedral or temple',
    'Take a guided walking tour of the city center',
    'Watch the sunrise from a scenic viewpoint',
    'Stroll through the local farmers market',
    'Visit a traditional tea house or café',
  ],
  afternoon: [
    'Visit the national museum',
    'Lunch at a family-run local restaurant',
    'Hike a nearby scenic trail',
    'Take a river or harbor boat tour',
    'Explore the art gallery district',
    'Shop at the central bazaar or souk',
  ],
  evening: [
    'Dinner at a rooftop restaurant with city views',
    'Enjoy live traditional music',
    'Night walk through the illuminated streets',
    'Relax at a local pub or wine bar',
    'Try street food at the night market',
    'Attend a cultural performance or show',
  ],
};

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function mockCompletion(messages) {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  const userText = (lastUser && lastUser.content) || '';
  const lower = userText.toLowerCase();

  if (lower.includes('itinerary') || lower.includes('plan') || lower.includes('day')) {
    const daysMatch = userText.match(/(\d+)\s*-?\s*day/i);
    const days = daysMatch ? Math.min(Math.max(parseInt(daysMatch[1], 10), 1), 14) : 3;
    const destination = extractDestination(userText) || 'your destination';
    return generateMockItinerary(destination, days);
  }

  if (lower.includes('recommend') || lower.includes('suggest') || lower.includes('where should') || lower.includes('best place')) {
    return generateMockRecommendations(lower);
  }

  if (lower.includes('pack') || lower.includes('packing')) {
    return `🎒 Packing essentials for your trip:\n\n• Comfortable walking shoes\n• Weather-appropriate clothing (layers)\n• Travel adapter & power bank\n• Toiletries & medications\n• ID / passport / booking confirmations\n• Reusable water bottle\n• Small daypack\n• Sunscreen & sunglasses\n\n💡 Pro tip: Roll your clothes to save space, and check the forecast a day before you fly.`;
  }

  if (lower.includes('budget') || lower.includes('cost')) {
    return `💰 Smart budgeting tips:\n\n• Travel in shoulder season for lower prices\n• Book accommodation 4–8 weeks ahead\n• Eat where locals eat (markets, street food)\n• Use public transport or walk when possible\n• Set a daily spending limit and track it\n• Look for free walking tours and museum free-days\n\nWant a rough cost estimate for a specific city?`;
  }

  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
    const greetings = [
      'Hello! I\'m SmartGuide ✈️ — your AI travel assistant.',
      'Hi there! Ready to plan your next adventure?',
      'Greetings! I\'m here to help you design the perfect trip.',
    ];
    return `${randomPick(greetings)}\n\nI can help you with:\n• Custom day-by-day itineraries\n• Destination recommendations\n• Packing and budgeting advice\n• Local tips and hidden gems\n\nWhere would you like to go?`;
  }

  return `That's a great question! To give you the best advice, could you share:\n\n1. Your destination(s)\n2. How many days you'll travel\n3. Your interests (culture, food, nature, adventure, relaxation)\n4. Your budget level (budget / mid-range / luxury)\n\nWith those details, I'll build you a personalized plan.`;
}

function extractDestination(text) {
  const known = ['paris','tokyo','new york','london','bali','rome','bangkok','barcelona','sydney','dubai','istanbul','marrakech','kyoto','santorini','cape town','rio de janeiro','vancouver','berlin','amsterdam','prague','dubai','cairo','moscow','delhi','bangkok','seoul','singapore','hong kong','istanbul','moscow','rome','athens','lisbon','madrid','milan','venice','florence','vienna','budapest','stockholm','oslo','copenhagen','helsinki','reykjavik','dublin','edinburgh','brussels','zurich','geneva','bratislava','ljubljana','zagreb','sarajevo','skopje','sofia','bucharest','kyiv','minsk','riga','vilnius','tallinn','warsaw','prague','bratislava','ljubljana','zagreb'];
  const lower = text.toLowerCase();
  for (const city of known) if (lower.includes(city)) return city;
  return null;
}

function generateMockItinerary(destination, days) {
  let result = `🗓️ ${days}-Day Itinerary for ${destination}\n\n`;
  result += `Here's a personalized plan for your trip to ${destination}. Adjust based on your pace and interests.\n\n`;
  for (let d = 1; d <= days; d++) {
    const m = randomPick(activityPool.morning);
    const a = randomPick(activityPool.afternoon);
    const e = randomPick(activityPool.evening);
    const costs = ['Budget ($)', 'Mid-range ($$)', 'Luxury ($$$)'];
    const cost = costs[Math.floor(Math.random() * costs.length)];
    result += `**Day ${d}**\n`;
    result += `• Morning: ${m}\n`;
    result += `• Afternoon: ${a}\n`;
    result += `• Evening: ${e}\n`;
    result += `• Meal: Try a local specialty dish\n`;
    result += `• Est. cost: ${cost}\n\n`;
  }
  result += `💡 Tips for ${destination}:\n• Start early to beat crowds at top sights\n• Book popular attractions in advance\n• Keep digital and paper copies of reservations\n• Ask locals for their favorite spots\n\nEnjoy your trip to ${destination}!`;
  return result;
}

function generateMockRecommendations(lower) {
  const recs = [
    { name: 'Kyoto, Japan', why: 'Temples, cherry blossoms, tea houses — perfect for culture lovers.', budget: 'Mid-range' },
    { name: 'Bali, Indonesia', why: 'Tropical beaches, rice terraces, wellness retreats — ideal for relaxation.', budget: 'Budget' },
    { name: 'Barcelona, Spain', why: 'Gaudí architecture, tapas, vibrant Mediterranean lifestyle.', budget: 'Mid-range' },
    { name: 'Queenstown, New Zealand', why: 'Adventure capital — bungee, skiing, breathtaking alpine scenery.', budget: 'Luxury' },
    { name: 'Marrakech, Morocco', why: 'Colorful souks, historic palaces, aromatic Moroccan cuisine.', budget: 'Budget' },
    { name: 'Reykjavik, Iceland', why: 'Northern lights, geothermal pools, dramatic volcanic landscapes.', budget: 'Luxury' },
    { name: 'Amsterdam, Netherlands', why: 'Canals, museums, cycling culture, and cozy cafés.', budget: 'Mid-range' },
    { name: 'Cape Town, South Africa', why: 'Table Mountain, beaches, vineyards, and wildlife.', budget: 'Budget' },
  ];
  let result = '🌍 Destination Recommendations\n\n';
  // Shuffle for variety
  const shuffled = [...recs].sort(() => Math.random() - 0.5);
  for (const r of shuffled) {
    result += `• ${r.name} (${r.budget})\n  ${r.why}\n\n`;
  }
  result += 'Tell me your interests and travel dates, and I can narrow this down further!';
  return result;
}

module.exports = { chatCompletion, SYSTEM_PROMPT };
