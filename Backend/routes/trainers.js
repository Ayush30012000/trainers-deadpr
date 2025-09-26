const express = require('express');
const multer = require('multer');
const path = require('path');
const Trainer = require('../models/Trainer');

const router = express.Router();

// configure multer storage to ./uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${basename}${ext}`);
  }
});

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

    const profilePictureUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

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

module.exports = router;
