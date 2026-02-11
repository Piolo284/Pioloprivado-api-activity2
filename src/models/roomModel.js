
const mongoose = require('mongoose');
// This is the "Rule Book" for a Room
const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number, // Number: 101
    required: true,
    unique: true, // No duplicate room numbers allowed
  },
  type: {
    type: String, // Text: "Single", "Suite"
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min:[0, 'Price cannot be negative'],
  },
    maintenanceLog: [
    {
    date: { type: Date, default: Date.now },
    issue: String, // e.g., "Broken AC"
    fixed: Boolean
    }
  ]
});

module.exports = mongoose.model('Room', roomSchema);
