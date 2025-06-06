// api/index.js (or api/server.js/app.js)
const express = require('express');
const cors = require('cors'); 

const app = express();

// --- IMPORTANT: Configure CORS ---
const allowedOrigins = [
  'http://localhost:3000', 
  'https://portfolio-green-three-20.vercel.app', 
  
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

// ... your existing routes ...

app.post('/api/gemini-chat', async (req, res) => { // Assuming this is your endpoint
    // Your Gemini chat logic here
    // ...
    try {
        // Placeholder for your actual Gemini AI call
        const geminiResponse = "This is a response from Arjun AI!"; 
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