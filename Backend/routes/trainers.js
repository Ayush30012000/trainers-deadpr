const express = require('express');
const multer = require('multer');
const path = require('path');
const Trainer = require('../models/Trainer');
const ImageKit = require('imagekit');

const router = express.Router();

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Validate ImageKit configuration on startup
if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
  console.warn('ImageKit credentials not properly configured. Image upload will be disabled.');
}

// configure multer storage to memory (for ImageKit upload)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    // accept only images
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
});

// POST /api/trainers
// Accepts multipart/form-data (fields + optional profilePicture)
router.post('/', upload.single('profilePicture'), async (req, res) => {
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

    // Basic validation
    if (!fullName || !email || !category) {
      return res.status(400).json({ message: 'fullName, email and category are required.' });
    }

    // Check blacklist / existing trainer (example)
    // Implement your blacklist check logic here (DB or other)
    // Example: don't allow duplicate emails
    const existing = await Trainer.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'A trainer with this email already exists.' });
    }
    
    let profilePictureUrl = undefined;

    // Upload image to ImageKit if file is provided
    if (req.file) {

      // Check if ImageKit is properly configured
      if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
        console.warn('ImageKit not configured, skipping image upload');
      } else {
        try {
          const uploadResult = await imagekit.upload({
            file: req.file.buffer, // Use buffer from memory storage
            fileName: `trainer-${Date.now()}-${req.file.originalname}`,
            folder: '/trainers', // Optional: organize images in folders
            tags: ['trainer', 'profile', category], // Add relevant tags
            useUniqueFileName: true,
            responseFields: ['isPrivateFile', 'tags', 'customCoordinates']
          });

          profilePictureUrl = uploadResult.url;
          console.log('Image uploaded to ImageKit successfully:', uploadResult.url);
        } catch (uploadError) {
          console.error('ImageKit upload error:', uploadError);
          console.error('Error details:', uploadError.message);
          // Continue without image instead of failing completely
          console.log('Continuing registration without image...');
        }
      }
    }

    const trainer = new Trainer({
      fullName,
      email,
      phone,
      category,
      experience,
      location,
      bio,
      profilePictureUrl,
      metadata: {
        // any custom fields you want to save
      }
    });

    const saved = await trainer.save();

    return res.status(201).json({ message: 'Registration successful', trainer: saved });
  } catch (err) {
    console.error('Error saving trainer:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/trainers - Get all trainers
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({ registeredAt: -1 });
    return res.json({ trainers });
  } catch (err) {
    console.error('Error fetching trainers:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    const updatedTrainer = await Trainer.findByIdAndUpdate(
      id,
      { status },
      { new: true } // return updated doc
    );

    if (!updatedTrainer) {
      return res.status(404).json({ message: "Trainer not found." });
    }

    return res.json({ message: "Trainer status updated", trainer: updatedTrainer });
  } catch (err) {
    console.error("Error updating trainer status:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTrainer = await Trainer.findByIdAndDelete(id);

    if (!deletedTrainer) {
      return res.status(404).json({ message: "Trainer not found." });
    }
    return res.json({ message: "Trainer deleted successfully." });
  } catch (err) {
    console.error("Error deleting trainer:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
