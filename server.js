require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chatRoutes');
const contactRoutes = require('./routes/contactRoutes');
const skillsRoutes = require('./routes/skillsRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:3000',
  'http://192.168.68.101:3000',
  'https://portfolio-green-three-20.vercel.app',
];

if (process.env.FRONTEND_ORIGIN && !allowedOrigins.includes(process.env.FRONTEND_ORIGIN)) {
  allowedOrigins.push(process.env.FRONTEND_ORIGIN);
}

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio-db';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });

app.use('/api', chatRoutes);
app.use('/api', contactRoutes); 
app.use('/api', skillsRoutes);

app.get('/', (req, res) => {
  res.status(200).send('AI Backend Server is Running!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

app.listen(PORT, () => {
  console.log(`AI Backend Server running on port ${PORT}`);
  console.log(`CORS allowed origins: ${allowedOrigins.join(', ')}`);
});

module.exports = app;