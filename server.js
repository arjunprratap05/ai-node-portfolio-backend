// api/index.js (or api/server.js)
const express = require('express');
const cors = require('cors');

const app = express();

// --- CORS Configuration (from previous solution) ---
const allowedOrigins = [
  'http://localhost:3000',
  'https://portfolio-green-three-20.vercel.app', // Your deployed frontend URL
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

// --- ADD THIS ROUTE HANDLER ---
// This handles GET requests to the root path (e.g., https://ai-node-portfolio-backend.vercel.app/)
app.get('/', (req, res) => {
  res.send('AI Backend Server is Running!'); // Or res.json({ message: 'Server is healthy' });
});
// --- END ADDITION ---

// Your existing /api/hello and /api/gemini-chat routes
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Vercel Serverless Function!' });
});

app.post('/api/gemini-chat', async (req, res) => {
    // Your Gemini chat logic here
    try {
        // Placeholder for your actual Gemini AI call
        const geminiResponse = "";
        res.json({ response: geminiResponse });
    } catch (error) {
        console.error("Gemini AI Error:", error);
        res.status(500).json({ error: "Failed to get response from AI." });
    }
});

// Export the Express app as the handler for Vercel
module.exports = app;

// Optional: for local testing
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Local server listening at http://localhost:${port}`);
    });
}