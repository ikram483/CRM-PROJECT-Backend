const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  contactName: String,
  contactEmail: String,
  companyName: String,
  status: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED'],
    default: 'PENDING',
  },
  notes: [String],
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Lead', leadSchema);
