const express = require('express');
const cors = require('cors');

const app = express();

// --- CORS Configuration ---
const allowedOrigins = [
  'http://localhost:3000', // For local React development
  'https://portfolio-green-three-20.vercel.app', // <-- YOUR DEPLOYED FRONTEND URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));
// --- END CORS Configuration ---

app.use(express.json());

// --- Add a root handler for health check (prevents "Cannot GET /") ---
app.get('/', (req, res) => {
  res.send('AI Backend Server is Running!');
});

// --- Your actual API endpoint for the chatbot ---
app.post('/api/gemini-chat', async (req, res) => {
    // ... your existing Gemini AI logic ...
    try {
        const { message } = req.body;
        // Assuming sendMessageToAI is a function you'd call here to interact with Gemini
        // For example:
        const geminiResponse = `You said: "${message}". This is a placeholder AI response!`; 
        res.json({ response: geminiResponse });
    } catch (error) {
        console.error("Gemini AI Error:", error);
        res.status(500).json({ error: "Failed to get response from AI." });
    }
});

module.exports = app;

// Optional: for local testing
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Local server listening at http://localhost:${port}`);
    });
}