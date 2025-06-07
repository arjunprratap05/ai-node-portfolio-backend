const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoute'); 

const app = express();


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


app.use(express.json());


app.get('/', (req, res) => {
  res.send('AI Backend Server is Running!');
});

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Vercel Serverless Function!' });
});


app.use('/api', chatRoutes); 

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Local server listening at http://localhost:${port}`);
    });
}