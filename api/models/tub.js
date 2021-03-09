const mongoose = require('mongoose')

const tubSchema = mongoose.Schema({
    _id: Number, 
    state: Number,
    start: Number
})

module.exports = mongoose.model('Tub', tubSchema)