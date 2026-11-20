const asyncHandler = require('express-async-handler');
const { chatCompletion } = require('../services/aiService');

/**
 * @desc    Chat with the AI travel assistant
 * @route   POST /api/ai/chat
 * @access  Public (optional auth)
 */
const chat = asyncHandler(async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400);
    throw new Error('Message is required');
  }

  // Build message array for the model (last N messages to keep context small)
  const messages = history.slice(-10).map((m) => ({
    role: m.role,
    content: m.content,
  }));
  messages.push({ role: 'user', content: message });

  const result = await chatCompletion(messages, {
    temperature: 0.7,
    maxTokens: 1000,
  });

  res.json({
    reply: result.content,
    source: result.source,
    model: result.model,
  });
});

module.exports = { chat };
