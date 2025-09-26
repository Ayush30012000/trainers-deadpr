// routes/trainerRoutes.js
const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainer'); // assuming you created Trainer model

// Get all trainers
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
