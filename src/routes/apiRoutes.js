const express = require('express');
const router = express.Router();

const Guest = require('../models/guestMOdel'); 
const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');


const {
  getAllRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');

router.get('/rooms', getAllRooms);
router.post('/rooms', createRoom);
router.get('/rooms/:id', getRoomById);
router.put('/rooms/:id', updateRoom); 
router.delete('/rooms/:id', deleteRoom);


router.put('/rooms/:id/maintenance', async (req, res) => {
    try {
        const { issue, fixed } = req.body;
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { 
                $push: { maintenanceLog: { issue, fixed: fixed || false } } 
            }, 
            { new: true }
        );
        res.json(updatedRoom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- GUEST ROUTES (Reference Test) ---
router.post('/guests', async (req, res) => {
    try {
        const guest = await Guest.create(req.body);
        res.status(201).json(guest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- BOOKING ROUTES (Reference Test) ---
router.post('/bookings', async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        // Populate lets you see the actual Guest/Room data in the response
        const fullBooking = await Booking.findById(booking._id)
            .populate('guest')
            .populate('room');
        res.status(201).json(fullBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;