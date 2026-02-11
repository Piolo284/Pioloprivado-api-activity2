const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');

// CREATE Booking
router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all Bookings (optional but recommended)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('room')
      .populate('guest');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
