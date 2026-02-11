const express = require('express');
const router = express.Router();
const Guest = require('../models/guestModel');

// CREATE Guest
router.post('/', async (req, res) => {
  try {
    const guest = await Guest.create(req.body);
    res.status(201).json(guest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all Guests (optional but useful)
router.get('/', async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
