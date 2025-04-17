const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, enum: ['employer', 'manager'] }
});

module.exports = mongoose.model('User', userSchema);
