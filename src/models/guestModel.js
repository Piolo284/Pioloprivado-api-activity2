const mongoose = require('mongoose');
const guestSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

module.exports = mongoose.model('Guest', guestSchema);