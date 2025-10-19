// routes/trainerRoutes.js
const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainer'); 

// trainer route with pagination 
router.get('/', async (req, res, next) => {

  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Query with pagination
    const [total, trainers] = await Promise.all([
      Trainer.countDocuments(),
      Trainer.find().skip(skip).limit(limit)
    ]);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      trainers
    });
  } catch (error) {
    console.log('Error fetching trainers:', error);
    next(error); // Pass to global error handler
  }
});


module.exports = router;
