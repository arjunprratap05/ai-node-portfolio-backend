const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

router.post('/gemini-chat', chatController.handleChatRequest);
router.post('/send-chat-summary-email', chatController.sendChatSummaryEmail);


module.exports = router;