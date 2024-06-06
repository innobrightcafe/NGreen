const mongoose = require('mongoose');
const User = require('./userModel.js');

const walletSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    number: {
        type: Number,
    },
    balance: {
        type: Number,
        default: 0.0
    }
}, { timestamps: true })

module.exports = mongoose.model('Wallet', walletSchema)