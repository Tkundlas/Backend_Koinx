require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const cryptoRoutes = require('./routes/cryptoRoutes');
const startCronJob = require('./jobs/fetchCryptoData');

const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('Welcome to the Cryptocurrency API!');
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', cryptoRoutes);

// Start the cron job
startCronJob();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
