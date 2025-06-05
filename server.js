// ai-backend/server.js
require('dotenv').config(); // Load environment variables from .env first

const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Define allowed origins.
// This array will contain all URLs from which your frontend is allowed to make requests.
const allowedOrigins = [
  'http://localhost:3000', // For your React app running locally (most common default)
  'http://192.168.1.35:3000', // If you're accessing from another device on your local network
  'https://portfolio-green-three-20.vercel.app', // Your deployed Vercel frontend URL
  // Add other specific production URLs here if you have custom domains for frontend, e.g., 'https://www.yourportfolio.com'
];

// Dynamically add the FRONTEND_ORIGIN environment variable if it's set.
// This is especially useful for Vercel deployments where the exact frontend URL might change or be a custom domain.
if (process.env.FRONTEND_ORIGIN && !allowedOrigins.includes(process.env.FRONTEND_ORIGIN)) {
  allowedOrigins.push(process.env.FRONTEND_ORIGIN);
}

app.use(cors({
  credentials: true, // Allow cookies to be sent with cross-origin requests (if needed for authentication later)
  origin: function (origin, callback) {
    // Allow requests with no origin (like direct API calls from Postman, curl, or mobile apps)
    if (!origin) return callback(null, true);
    // Check if the requesting origin is in our list of allowed origins
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods your API will use
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers your API might receive
}));

app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/api', chatRoutes); // Mount the chat routes under the '/api' base path

// Basic root route for server health check
app.get('/', (req, res) => {
  res.status(200).send('AI Backend Server is Running!');
});

// Global error handling middleware for any unhandled errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the full error stack for debugging
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`AI Backend Server running on port ${PORT}`);
  console.log(`CORS allowed origins: ${allowedOrigins.join(', ')}`); // Log all configured allowed origins
});

module.exports = app; // IMPORTANT: Export the Express app for Vercel Serverless Functions