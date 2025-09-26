const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainer');

// PATCH /api/trainers/:id/blacklist
router.patch('/', async (req, res) => {
  try {
    const { id } = req.params;

    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    if (trainer.status === "blacklisted") {
      return res.status(400).json({ message: 'Trainer already blacklisted' });
    }

    trainer.status = "blacklisted";
    await trainer.save();

    return res.json({ message: 'Trainer blacklisted successfully', trainer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
