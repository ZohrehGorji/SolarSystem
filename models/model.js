const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: String,
    age: Number
})

module.exports = mongoose.model('Data', dataSchema)