const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Trainer = require('./Trainer');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    Gender: { type: String, enum: ['male', 'female', 'other'] },
    dateOfBirth: { type: Date },
    address: { type: String },
    profliePictureUrl: { type: String },
    role: { type: String, enum: ['admin', 'trainer'], default: 'trainer' },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving  
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
// Method to generate JWT
UserSchema.methods.generateJWT = function () {
    return jwt.sign(
        { id: this._id, username: this.username, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}
module.exports = mongoose.model('User', UserSchema);