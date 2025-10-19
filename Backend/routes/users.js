const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');

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


// GET /api/users
router.post('/',upload.single("profilePicture"), async (req, res,next) => {
  try {
    const {fullName,username,email,password,phone,Gender,dateOfBirth,adderss,role}=req.body;
    console.log(dateOfBirth);
    if(!fullName || !username || !email || !password){
      return res.status(400).json({message:'fullName,username,email and password are required'});
    }
      const profilePictureUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const newUser = new User({fullName,username,email,password,phone,Gender,dateOfBirth,adderss,role,profilePictureUrl});
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    next(err);
    }
});

module.exports = router;