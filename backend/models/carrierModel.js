const mongoose = require('mongoose');
const User = require('./userModel.js');
const Wallet = require('./walletModel.js')

const carrierSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    agent_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    active: Boolean,
    approved: Boolean,
    rating: {
        type: Number,
    },
    address: String,
    refer: Number,
    rating: Number
}, { timestamps: true })

module.exports = mongoose.model('Carrier', carrierSchema)