require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const trainersRouter = require('./routes/trainers');
const trainerRoutes = require('./routes/trainerRoutes');
const blackListUserRoute= require('./routes/blackListUserRoute')

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/trainers', trainersRouter);
app.use('/api/trainersData', trainerRoutes);
app.use('/api/:id/blacklist', blackListUserRoute);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
