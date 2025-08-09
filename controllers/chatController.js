const geminiService = require('../services/geminiService');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});

async function handleChatRequest(req, res) {
    const userMessage = req.body.message;

    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim().length === 0) {
        return res.status(400).json({ error: 'Invalid or empty message provided.' });
    }

    try {
        const aiResponse = await geminiService.getGeminiResponse(userMessage);
        res.status(200).json({ response: aiResponse });
    } catch (error) {
        console.error('Error in chatController.handleChatRequest:', error.message);
        res.status(500).json({
            error: error.message || 'An unexpected error occurred while processing your chat request.'
        });
    }
}

async function sendChatSummaryEmail(req, res) {
    const { userName, conversation } = req.body;
    const recipientEmail = process.env.CHAT_SUMMARY_RECIPIENT_EMAIL; 

    if (!userName || !conversation || !Array.isArray(conversation) || conversation.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid or incomplete conversation data provided.' });
    }

    let emailBody = `
        <p><strong>Chatbot Conversation Summary with ${userName}</strong></p>
        <p>------------------------------------</p>
        <div style="font-family: monospace; white-space: pre-wrap; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
    `;
    conversation.forEach(msg => {
        emailBody += `<p style="margin: 5px 0;">[${msg.timestamp}] <strong>${msg.from}</strong>: ${msg.text}</p>`;
    });
    emailBody += `
        </div>
        <p>------------------------------------</p>
        <p>This email was sent from your portfolio chatbot.</p>
    `;

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: recipientEmail,           
            subject: `Chatbot Conversation from ${userName}`,
            html: emailBody 
        };

        await transporter.sendMail(mailOptions);
        console.log(`Chat summary email sent successfully to ${recipientEmail} for user ${userName}.`);
        res.status(200).json({ success: true, message: 'Chat summary email sent successfully!' });

    } catch (error) {
        console.error('Error sending chat summary email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send chat summary email. Please try again later.',
            error: error.message
        });
    }
}
module.exports = {
    handleChatRequest,
    sendChatSummaryEmail 
};