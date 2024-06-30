const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Carrier = require('../models/carrierModel');
const jwt = require('jsonwebtoken')
const { hashPassword, comparePassword } = require('./password')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('./formatter.js');
const { cache } = require('./cache')
const otpGenerator = require('otp-generator');
const { sendEmail } = require('./mailer.js')

const UserToken = expressAsyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).json({ "error": "No email or password for authentication" })
    }
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(401).json({ "error": "No such email" })
    }
    user = format(user)
    const compare = await comparePassword(user.password, req.body.password)
    if (!compare) {
        return res.status(401).json({ "error": "Incorrect pasword" })
    }
    const otp = otpGenerator.generate(6, { lowerCaseAlphabets : false, specialChars: false, upperCaseAlphabets : false });
    cache.set(otp, JSON.stringify({ email: user.email, password: user.password }))
    await sendEmail(user.email, 'OTP', `Your OTP is ${otp}`)
    return res.status(200).json({ "message": "OTP sent to your email" })

})

const CarrierToken = expressAsyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).json({ "error": "No email or password for authentication" })
    }
    let carrier = await Carrier.findOne({ email: req.body.email })
    if (!carrier) {
        return res.status(401).json({ "error": "No such email" })
    }
    carrier = format(carrier)
    const compare = await comparePassword(carrier.password, req.body.password)
    if (!compare) {
        return res.status(401).json({ "error": "Incorrect password" })
    }
    const otp = otpGenerator.generate(6, { lowerCaseAlphabets : false, specialChars: false, upperCaseAlphabets : false });
    cache.set(otp, JSON.stringify({ email: carrier.email, password: carrier.password }))
    await sendEmail(carrier.email, 'OTP', `Your OTP is ${otp}`)
    return res.status(200).json({ "message": "OTP sent to your email" })
})

module.exports = { UserToken, CarrierToken }