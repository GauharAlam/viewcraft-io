const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // We will add social media tokens here later
  socialProfiles: {
    type: Array,
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);