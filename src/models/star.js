const mongoose = require('mongoose');


const startSchema = new mongoose.Schema({
    name: {
        type: String,
        uniqe:true,
        require: true
    },

    temperature: {
        type: String,
        require: true
    },

    mass: {
        type: String,
        require: true
    },

    diameter: {
        type: String,
        require: true
    },

    image: {
        type: String,
        require: true
    },
    planets: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Planet'}
    ]
}, {timestamps: true})

module.exports = mongoose.model('Star', startSchema);