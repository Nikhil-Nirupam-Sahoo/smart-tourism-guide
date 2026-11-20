/**
 * AI Service for Smart Tourism Guide
 *
 * Providers (set AI_PROVIDER):
 *   groq       - free, very fast. Needs GROQ_API_KEY (or OPENAI_API_KEY).
 *   gemini     - free tier. Needs GEMINI_API_KEY (or GOOGLE_API_KEY).
 *   openrouter - one key for many models. Needs OPENROUTER_API_KEY.
 *   openai     - needs OPENAI_API_KEY.
 *   mock       - built-in demo responses, no key required (default).
 *
 * Optional: AI_MODEL overrides the provider's default model.
 * AI_PROVIDER=openai with OPENAI_BASE_URL also works with any OpenAI-compatible API.
 */

const { OpenAI } = require('openai');

const PROVIDER = (process.env.AI_PROVIDER || 'mock').trim().toLowerCase();

const SYSTEM_PROMPT = `You are SmartGuide, an expert AI travel assistant.
Help users plan trips, discover destinations, and get local travel tips.
Be friendly, concise, practical. For itineraries include morning/afternoon/evening, durations, estimated costs, food, tips.
When asked for an itinerary, use exactly this structure for each day:
**Day 1**
• Morning: <activity>
• Afternoon: <activity>
• Evening: <activity>
• Meal: <suggestion>
• Est. cost: <estimate>
Format day headers with ** bold markers ** and bullet points with •. Decline unsafe/illegal requests politely.`;

const PROVIDERS = {
  groq: {
    label: 'Groq',
    key: process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY || '',
    model: process.env.AI_MODEL || process.env.OPENAI_MODEL || 'openai/gpt-oss-120b',
    baseURL: process.env.OPENAI_BASE_URL || 'https://api.groq.com/openai/v1',
    kind: 'openai-compatible',
  },
  openrouter: {
    label: 'OpenRouter',
    key: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || '',
    model: process.env.AI_MODEL || process.env.OPENAI_MODEL || 'meta-llama/llama-3.3-70b-instruct:free',
    baseURL: process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1',
    kind: 'openai-compatible',
  },
  openai: {
    label: 'OpenAI',
    key: process.env.OPENAI_API_KEY || '',
    model: process.env.AI_MODEL || process.env.OPENAI_MODEL || 'gpt-4o-mini',
    baseURL: process.env.OPENAI_BASE_URL || undefined,
    kind: 'openai-compatible',
  },
  gemini: {
    label: 'Gemini',
    key: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '',
    model: process.env.AI_MODEL || 'gemini-2.5-flash',
    kind: 'gemini',
  },
};

const clientCache = new Map();

function configuredProvider() {
  if (PROVIDER === 'mock' || PROVIDER === 'none') return null;
  if (PROVIDERS[PROVIDER]) return PROVIDERS[PROVIDER];

  // Backwards compatibility: if an unknown provider is set but a key exists,
  // treat it as an OpenAI-compatible endpoint.
  const key = process.env.OPENAI_API_KEY || process.env.AI_API_KEY || '';
  return {
    label: PROVIDER,
    key,
    model: process.env.AI_MODEL || process.env.OPENAI_MODEL || 'gpt-4o-mini',
    baseURL: process.env.OPENAI_BASE_URL || undefined,
    kind: 'openai-compatible',
  };
}

async function openAICompatibleCompletion(messages, options, cfg) {
  if (!cfg.key) {
    const err = new Error(`No API key found for ${cfg.label}. Set the key in Render environment variables.`);
    err.statusCode = 503;
    throw err;
  }

  let client = clientCache.get(cfg.label);
  if (!client) {
    client = new OpenAI({ apiKey: cfg.key, baseURL: cfg.baseURL });
    clientCache.set(cfg.label, client);
  }

  const completion = await client.chat.completions.create({
    model: cfg.model,
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    temperature: options.temperature,
    max_tokens: options.maxTokens,
  });

  const content = completion.choices?.[0]?.message?.content || '';
  return { content, source: cfg.label, model: cfg.model };
}

async function geminiCompletion(messages, options, cfg) {
  if (!cfg.key) {
    const err = new Error('No Gemini API key found. Set GEMINI_API_KEY in Render environment variables.');
    err.statusCode = 503;
    throw err;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    cfg.model
  )}:generateContent?key=${encodeURIComponent(cfg.key)}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(m.content || '') }],
      })),
      generationConfig: {
        temperature: options.temperature,
        maxOutputTokens: options.maxTokens,
      },
    }),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.error?.message || `Gemini request failed with HTTP ${response.status}`);
  }

  const content =
    data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('') || '';
  return { content, source: cfg.label, model: cfg.model };
}

/**
 * Generate a chat completion. Returns { content, source, model }.
 * Real provider failures are surfaced instead of silently using the demo AI.
 */
async function chatCompletion(messages, options = {}) {
  const settings = {
    temperature: options.temperature ?? 0.7,
    maxTokens: options.maxTokens ?? 1000,
  };

  const cfg = configuredProvider();
  if (cfg) {
    try {
      return cfg.kind === 'gemini'
        ? await geminiCompletion(messages, settings, cfg)
        : await openAICompatibleCompletion(messages, settings, cfg);
    } catch (err) {
      console.error(`${cfg.label} error:`, err.message);
      if (err.statusCode) throw err;
      const wrapped = new Error(`${cfg.label} request failed: ${err.message}`);
      wrapped.statusCode = 502;
      throw wrapped;
    }
  }

  return { content: mockCompletion(messages), source: 'mock', model: 'built-in' };
}

/* ------------------------------------------------------------------ */
/* Demo/mock AI — used only when AI_PROVIDER=mock (the default).        */
/* ------------------------------------------------------------------ */

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
    return generateMockRecommendations();
  }

  if (lower.includes('pack') || lower.includes('packing')) {
    return `🎒 Packing essentials for your trip:\n\n• Comfortable walking shoes\n• Weather-appropriate clothing (layers)\n• Travel adapter & power bank\n• Toiletries & medications\n• ID / passport / booking confirmations\n• Reusable water bottle\n• Small daypack\n• Sunscreen & sunglasses\n\n💡 Pro tip: Roll your clothes to save space, and check the forecast a day before you fly.`;
  }

  if (lower.includes('budget') || lower.includes('cost')) {
    return `💰 Smart budgeting tips:\n\n• Travel in shoulder season for lower prices\n• Book accommodation 4–8 weeks ahead\n• Eat where locals eat (markets, street food)\n• Use public transport or walk when possible\n• Set a daily spending limit and track it\n• Look for free walking tours and museum free-days\n\nWant a rough cost estimate for a specific city?`;
  }

  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
    const greetings = [
      "Hello! I'm SmartGuide ✈️ — your AI travel assistant.",
      'Hi there! Ready to plan your next adventure?',
      "Greetings! I'm here to help you design the perfect trip.",
    ];
    return `${randomPick(greetings)}\n\nI can help you with:\n• Custom day-by-day itineraries\n• Destination recommendations\n• Packing and budgeting advice\n• Local tips and hidden gems\n\nWhere would you like to go?`;
  }

  return `That's a great question! To give you the best advice, could you share:\n\n1. Your destination(s)\n2. How many days you'll travel\n3. Your interests (culture, food, nature, adventure, relaxation)\n4. Your budget level (budget / mid-range / luxury)\n\nWith those details, I'll build you a personalized plan.`;
}

function extractDestination(text) {
  const known = [
    'agra', 'jaipur', 'delhi', 'mumbai', 'varanasi', 'goa', 'munnar', 'udaipur',
    'rishikesh', 'shimla', 'manali', 'kochi', 'hampi', 'mysore', 'amritsar',
    'srinagar', 'leh', 'gangtok', 'darjeeling', 'paris', 'tokyo', 'new york',
    'london', 'bali', 'rome', 'bangkok', 'barcelona', 'sydney', 'dubai',
    'istanbul', 'marrakech', 'kyoto', 'santorini', 'cape town', 'vancouver',
    'berlin', 'amsterdam', 'prague', 'cairo', 'seoul', 'singapore', 'lisbon',
  ];
  const lower = text.toLowerCase();
  for (const city of known) if (lower.includes(city)) return city;
  return null;
}

function generateMockItinerary(destination, days) {
  let result = `🗓️ ${days}-Day Itinerary for ${destination}\n\n`;
  result += `Here's a personalized plan for your trip to ${destination}. Adjust based on your pace and interests.\n\n`;
  for (let d = 1; d <= days; d++) {
    const costs = ['Budget ($)', 'Mid-range ($$)', 'Luxury ($$$)'];
    result += `**Day ${d}**\n`;
    result += `• Morning: ${randomPick(activityPool.morning)}\n`;
    result += `• Afternoon: ${randomPick(activityPool.afternoon)}\n`;
    result += `• Evening: ${randomPick(activityPool.evening)}\n`;
    result += `• Meal: Try a local specialty dish\n`;
    result += `• Est. cost: ${randomPick(costs)}\n\n`;
  }
  result += `💡 Tips for ${destination}:\n• Start early to beat crowds at top sights\n• Book popular attractions in advance\n• Keep digital and paper copies of reservations\n• Ask locals for their favorite spots\n\nEnjoy your trip to ${destination}!`;
  return result;
}

function generateMockRecommendations() {
  const recs = [
    { name: 'Agra, India', why: 'The Taj Mahal, Mughal history, and great food.', budget: 'Mid-range' },
    { name: 'Varanasi, India', why: 'Spiritual ghats, evening aarti, and timeless old lanes.', budget: 'Budget' },
    { name: 'Goa, India', why: 'Beaches, Portuguese heritage, and relaxed vibes.', budget: 'Mid-range' },
    { name: 'Munnar, India', why: 'Tea plantations, cool hills, and nature trails.', budget: 'Mid-range' },
    { name: 'Jaipur, India', why: 'Palaces, forts, and colorful bazaars.', budget: 'Budget' },
    { name: 'Rishikesh, India', why: 'Yoga, river rafting, and Himalayan views.', budget: 'Budget' },
    { name: 'Kyoto, Japan', why: 'Temples, cherry blossoms, tea houses.', budget: 'Mid-range' },
    { name: 'Bali, Indonesia', why: 'Tropical beaches, rice terraces, wellness retreats.', budget: 'Budget' },
    { name: 'Barcelona, Spain', why: 'Gaudí architecture, tapas, Mediterranean lifestyle.', budget: 'Mid-range' },
    { name: 'Marrakech, Morocco', why: 'Colorful souks, palaces, and Moroccan cuisine.', budget: 'Budget' },
  ];
  let result = '🌍 Destination Recommendations\n\n';
  const shuffled = [...recs].sort(() => Math.random() - 0.5);
  for (const r of shuffled.slice(0, 6)) {
    result += `• ${r.name} (${r.budget})\n  ${r.why}\n\n`;
  }
  result += 'Tell me your interests and travel dates, and I can narrow this down further!';
  return result;
}

module.exports = { chatCompletion, SYSTEM_PROMPT, configuredProvider };
