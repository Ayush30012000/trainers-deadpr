const mongoose = require('mongoose');

const BlackListTrainerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, index: true },
  phone: { type: String },
  category: { type: String, required: true },
  experience: { type: String },
  location: { type: String },
  bio: { type: String },
  profilePictureUrl: { type: String }, 
  status: { type: String, default: 'pending' },
  registeredAt: { type: Date, default: Date.now },
  metadata: { type: Object, default: {} }
});

module.exports = mongoose.model('BlackListTrainer', BlackListTrainerSchema);
