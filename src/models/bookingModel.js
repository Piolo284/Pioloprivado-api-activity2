const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    guest: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest' },
    checkIn: Date,
    checkOut: Date
});

module.exports = mongoose.model('Booking', bookingSchema);