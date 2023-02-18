const mongoose = require('mongoose');

const planet = new mongoose.Schema({
    name: String,
    size: Number,
    distance_to_sun: Number
})

module.exports = mongoose.model('Data', planet)