const expressAsyncHandler = require('express-async-handler')
const otpGenerator = require('otp-generator');
const User = require('../../models/userModel')
const Carrier = require('../../models/carrierModel')
const Otp = require('../../models/otpModel.js')
const Order = require('../../models/orderModel.js')
const { sharer } = require('../../utils/shareformula.js')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')
const { sendEmail } = require('../../utils/mailer.js')


const createOtp = expressAsyncHandler(async (req, res) => {
    const { order_id } = req.body
    const user_id = req.user_id
    const user = format(await User.findById(user_id))
    if (!user.id) {
        return res.status(400).json({ "error": "User not found" })
    }
    const order = format(await Order.findById(order_id))
    if (!order.id) {
        return res.status(400).json({ "error": " Order not found" })
    }

    if (order.status != "inprogress" && !order.carrier) {
        return res.status(400).json({ "error": "Order is not in progress" })
    }
    const carrier_id = order.carrier_id
    const otpa = await Otp.findOne({order_id, user_id, carrier_id})
    if(otpa) {
        return res.status(400).json({"error": "Otp has benn created for this order before"})
    }
    const otp = otpGenerator.generate(6, { lowerCaseAlphabets : false, specialChars: false, upperCaseAlphabets : false });
    await sendEmail(user.email, 'OTP', `Your OTP is ${otp}`)
    const newOtp = await Otp.create({ user_id: user_id, order_id: req.body.order_id, carrier_id: req.body.carrier_id, otp: otp })
    return res.status(201).json(format(newOtp))
})

const getOtp = expressAsyncHandler(async (req, res) => {
    const otp = await Otp.findOne({order_id: req.params.order_id, user_id: req.user_id})
    if (!otp) {
        return res.status(400).json({ "error": "Otp cannot be found" })
    }
    return res.json(format(otp))
})

const confirmOtp = expressAsyncHandler(async (req, res) => {
    const { order_id } = req.body;
    const carrier_id = req.user_id;

    let order = await Order.findById(order_id);
    if (!order) {
        return res.status(400).json({ "error": "No such order" });
    }
    order = format(order)

    const user_id = order.user_id;
    const otp = await Otp.findOne({ order_id });
    if (!otp) {
        return res.status(400).json({ "error": "The otp cannot be found" });
    }

    if (req.body.otp !== otp.otp) {
        return res.status(400).json({ "error": "Invalid Otp supplied" });
    }

    let result = 0;
    try {
        result = await sharer(order_id);
    } catch (error) {
        return res.status(400).json({ "error": error.message });
    }

    if (result === 1) {
        return res.status(200).json({ "success": "The order is completed and transaction is successful" });
    }

    return res.status(400).json({ "error": "An unknown error occurred" });
});



module.exports = { createOtp, getOtp, confirmOtp }