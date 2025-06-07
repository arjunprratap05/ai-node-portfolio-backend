const express = require('express');

const chatController = require('../controllers/chatController'); 

const router = express.Router();

router.post('/gemini-chat', chatController.handleChatRequest);

module.exports = router;