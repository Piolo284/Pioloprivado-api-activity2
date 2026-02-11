const Room = require('../models/roomModel');
const staticRooms = require('../data/rooms');


// 1. GET ALL: List all rooms
const getAllRooms = async (req, res) => {
  try {
    // Try DB first
    const rooms = await Room.find();
    if (rooms && rooms.length > 0) {
      return res.status(200).json({ status: 200, message: 'Retrieved rooms from DB', data: rooms });
    }

    // Fallback to static dataset when DB empty
    return res.status(200).json({ status: 200, message: 'Retrieved rooms (static fallback)', data: staticRooms });
  } catch (error) {
    // On DB error, return static dataset so endpoint remains usable
    console.warn('DB error in getAllRooms, returning static data:', error.message);
    return res.status(200).json({ status: 200, message: 'Retrieved rooms (static fallback due to DB error)', data: staticRooms });
  }
};

// 2. CREATE: Add a new room
const createRoom = async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 3. GET ONE: View one room details
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. UPDATE: Change price & booking status
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 5. DELETE: Remove a room
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
};
