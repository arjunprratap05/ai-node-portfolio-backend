const geminiService = require('../services/geminiService');

/**
 * Handles incoming chat requests from the frontend.
 * Validates input, calls the AI service, and sends the response back.
 * @param {Object} req - Express request object (expects req.body.message)
 * @param {Object} res - Express response object
 */
async function handleChatRequest(req, res) {
  const userMessage = req.body.message;

  if (!userMessage || typeof userMessage !== 'string' || userMessage.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid or empty message provided.' });
  }

  try {

    const aiResponse = await geminiService.getGeminiResponse(userMessage);


    res.status(200).json({ response: aiResponse });
  } catch (error) {
    // 4. Error Handling
    console.error('Error in chatController.handleChatRequest:', error.message);
    res.status(500).json({
      error: error.message || 'An unexpected error occurred while processing your chat request.'
    });
  }
}

module.exports = {
  handleChatRequest
};