const mongoose = require('mongoose');
const User = require('./userModel.js');
const Carrier = require('./carrierModel.js')
const Order = require('./orderModel.js')

const otpSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    carrier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Carrier
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Order
    },
    otp: String
}, { timestamps: true })

module.exports = mongoose.model('Otp', otpSchema)