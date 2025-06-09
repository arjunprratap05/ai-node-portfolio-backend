// server.js
const express = require('express');
const cors = require('cors');
// CRITICAL: Import your chat routes. Ensure this path is correct.
// It assumes chatRoute.js is in a 'routes' folder at the same level as server.js.
const chatRoutes = require('./routes/chatRoute'); 

const app = express();

// --- CORS Configuration ---
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
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow all necessary methods, especially POST for your chat API
  credentials: true,
  optionsSuccessStatus: 204
}));

app.use(express.json()); // Middleware to parse JSON request bodies

// --- Root path handler for health checks ---
app.get('/', (req, res) => {
  res.send('AI Backend Server is Running!'); 
});

// --- API Route Integration ---
// This is the CRITICAL line that connects your Express app to your modular chat routes.
// All requests starting with '/api' will be handled by chatRoutes.
// So, '/api/gemini-chat' (from your frontend) will be routed correctly here.
app.use('/api', chatRoutes); 

// >>>>>>> DO NOT ADD A SEPARATE app.post('/api/gemini-chat', ...) HERE <<<<<<<
// That will override the route from chatRoutes and return a hardcoded response.
// If you have a separate app.post('/api/gemini-chat', ...) block, REMOVE IT COMPLETELY.


// Export the Express app as the handler for Vercel
module.exports = app;

// Optional: for local testing
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Local server listening at http://localhost:${port}`);
    });
}