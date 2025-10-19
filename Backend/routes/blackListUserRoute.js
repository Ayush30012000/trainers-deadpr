const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainer');
const BlackListTrainer = require('../models/BlackListTrainer');

// GET /api/blacklist-trainer - Get all blacklisted trainers
router.get('/', async (req, res) => {
  try { 
    const blacklistedTrainers = await BlackListTrainer.find();
    return res.json({ 
      success: true,
      trainers: blacklistedTrainers 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/blacklist-trainer
router.post('/', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      category,
      experience,
      location,
      bio
    } = req.body;

    console.log("fullName", fullName);

    if (!fullName || !email || !category) {
      return res.status(400).json({ message: 'fullName, email and category are required.' });
    }

    // Check if already blacklisted
    const existing = await BlackListTrainer.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'A trainer with this email is already blacklisted.' });
    }

    // Check if trainer exists in Trainer collection
    const isExistUser = await Trainer.findOne({ email });
    const profilePictureUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Create blacklisted trainer data
    const blackListTrainerData = new BlackListTrainer({
      fullName,
      email,
      phone,
      category,
      experience,
      location,
      bio,
      profilePictureUrl,
      status: 'blacklisted',
      metadata: {
        blacklistedAt: new Date(),
        // any custom fields you want to save
      }
    });

    // Save to BlackListTrainer collection
    const saved = await blackListTrainerData.save();

    // If user exists in Trainer collection, remove them
    if (isExistUser) {
      await Trainer.deleteOne({ email });
      console.log(`Trainer with email ${email} removed from Trainer collection`);
    }

    console.log('Trainer blacklisted:', blackListTrainerData);

    return res.json({ 
      message: "Trainer is blacklisted successfully",
      data: saved
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/blacklist-trainer/:id - Blacklist by ID
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    // Check if already blacklisted
    const existing = await BlackListTrainer.findOne({ email: trainer.email });
    if (existing) {
      return res.status(400).json({ message: 'Trainer already blacklisted' });
    }

    // Create blacklisted trainer data from existing trainer
    const blackListTrainerData = new BlackListTrainer({
      fullName: trainer.fullName,
      email: trainer.email,
      phone: trainer.phone,
      category: trainer.category,
      experience: trainer.experience,
      location: trainer.location,
      bio: trainer.bio,
      profilePictureUrl: trainer.profilePictureUrl,
      status: 'blacklisted',
      registeredAt: trainer.registeredAt,
      metadata: {
        ...trainer.metadata,
        blacklistedAt: new Date(),
        originalId: trainer._id
      }
    });

    // Save to BlackListTrainer collection
    const saved = await blackListTrainerData.save();

    // Remove from Trainer collection
    await Trainer.findByIdAndDelete(id);

    return res.json({ 
      message: 'Trainer blacklisted successfully', 
      data: saved 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
