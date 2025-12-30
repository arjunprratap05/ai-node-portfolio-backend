const geminiService = require('../services/geminiService');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const handleChatRequest = async (req, res) => {
    const { message } = req.body;
    if (!message || message.trim().length === 0) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    try {
        const aiResponse = await geminiService.getGeminiResponse(message);
        res.status(200).json({ response: aiResponse });
    } catch (error) {
        console.error('Chat Controller Error:', error.message);
        const status = error.message.includes("overwhelmed") ? 429 : 500;
        res.status(status).json({ error: error.message });
    }
};

const sendChatSummaryEmail = async (req, res) => {
    const { userName, conversation } = req.body;
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CHAT_SUMMARY_RECIPIENT_EMAIL,
            subject: `Chatbot Conversation with ${userName}`,
            html: `<p>Summary for ${userName}</p><pre>${JSON.stringify(conversation, null, 2)}</pre>`
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Summary email sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { handleChatRequest, sendChatSummaryEmail };