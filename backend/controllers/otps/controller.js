const expressAsyncHandler = require('express-async-handler')
const otpGenerator = require('otp-generator');
const User = require('../../models/userModel')
const Carrier = require('../../models/carrierModel')
const Otp = require('../../models/otpModel.js')
const Order = require('../../models/orderModel.js')
const sharer = require('../../utils/shareformula.js')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')


const createOtp = expressAsyncHandler(async (req, res) => {
    const { carrier_id, order_id, user_id } = req.body
    const user = format(await User.findById(user_id))
    if (!user.id) {
        return res.status(400).json({ "error": "User not found" })
    }
    const order = format(await Order.findById(order_id))
    if (!order.id) {
        return res.status(400).json({ "error": " Order not found" })
    }
    const carrier = format(await Carrier.findById(carrier_id))
    if (!carrier.id) {
        return res.status(400).json({ "error": "Carrier not found" })
    }
    const otpa = format(await Otp.find({order_id, user_id, carrier_id}))
    if(otpa.id) {
        return res.status(400).json({"error": "Otp has benn created for this order before"})
    }
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
    console.log(otp);
    const newOtp = Otp.create({ user_id: req.body.user_id, order_id: req.body.order_id, carrier_id: req.body.carrier_id, otp: req.body.otp })
    return res.status(201).json(format(newOtp))
})

const getOtp = expressAsyncHandler(async (req, res) => {
    const otp = await Otp.findById(req.params.order_id)
    if (!otp) {
        return res.status(400).json({ "error": "Otp cannot be found" })
    }
    return res.json(format(otp))
})

const confirmOtp = expressAsyncHandler( async (req, res) => {
    const { carrier_id, order_id, user_id } = req.body
    const carrier = format(await Carrier.findById(carrier_id))
    if (!carrier.id) {
        return res.status(400).json({'error': "No such Carrier"})
    }
    const user = format(await User.findById(user_id))
    if (!user.id) {
        return res.status(400).json({"error": 'No such User'})
    }
    const order = format(await Order.findById(order_id))
    if(!order.id) {
        return res.status(400).json({"error": "No such order"})
    }
    const otp = format(await Otp.find({order_id, user_id, carrier_id}))
    if(!otp.id) {
        return res.status(400).json({"error": "The otp cannot be found"});
    }
    if (req.body.otp !== otp.otp)
        return res.status(400).json({"error": "Invalid Otp supplied"})
    let result = 0
    try {
        result = await sharer(order_id)
    } catch (error) {
        return res.status(400).json({"error": error.message});
    }
    if (result === 1) {
        return res.status(200).json({"success": "The order is completed and transaction is successful"})
    }
    return res.status(400).json({"error": "An unknown error occured"})
})


module.exports = { createOtp, getOtp, confirmOtp }