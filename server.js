// api/index.js (or api/server.js, etc.)
const express = require('express');
const cors = require('cors'); // Don't forget CORS!

const app = express();
const port = process.env.PORT || 5000; // Vercel sets its own PORT, but good practice for local

// CORS configuration (adjust as needed for your frontend's domain)
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000' // Your React app's domain
}));

app.use(express.json()); // For parsing JSON request bodies

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Vercel Serverless Function!' });
});

app.post('/api/data', (req, res) => {
    const { item } = req.body;
    res.json({ received: item, status: 'success' });
});

// Example of using an environment variable
app.get('/api/secret', (req, res) => {
    const secret = process.env.MY_SECRET_KEY || 'No secret set!';
    res.json({ secretMessage: `The secret is: ${secret}` });
});

// This is crucial for Vercel: export the app as a handler
module.exports = app;

// Optionally, for local testing:
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
}