const mongoose = require('mongoose');
const User = require('./userModel.js');
const Carrier = require('./carrierModel.js')
const Transaction = require('./transactionModel.js')

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    carrier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Carrier
    },
    transaction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Transaction
    },
    amount: Number,
    status: {
        type: String,
        enum: ["pending", "inprogress", "delivered", "cancelled"]
    },
    description: String
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)