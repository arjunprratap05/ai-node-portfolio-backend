const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/gemini-chat', chatController.handleChatRequest);
router.post('/send-chat-summary-email', chatController.sendChatSummaryEmail);

module.exports = router;