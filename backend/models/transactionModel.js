const mongoose = require('mongoose');
const User = require('./userModel.js');
const Wallet = require('./walletModel.js')

const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    wallet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Wallet
    },
    amount: {
        type: Number,
    },
    type: {
        type: String,
        enum: ["credit", "debit"]
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"]
    },
    description: String
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema)