const expressAsyncHandler = require('express-async-handler');
const User = require('../.../../../models/userModel.js');
const { hashPassword, comparePassword } = require('../../utils/password.js')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')
const { sendEmail } = require('../../utils/mailer.js')
const Wallet = require('../../models/walletModel.js');

const createUser = expressAsyncHandler(async (req, res) => {
    const exist = await User.findOne({ email: req.body.email })
    if (exist) {
        return res.status(409).json({ "error": "The email already exists" });
    }
    const password = req.body.password
    const hashpassword = await hashPassword(password);
    const user = await User.create({ fname: req.body.fname, lname: req.body.lname, password: hashpassword, refer: 0, pnumber: req.body.pnumber, type: 'user', email: req.body.email});
    const newUser = format(user);
    const user_id = newUser.id;
    const number = Math.floor(Math.random() * 1000000000);
    const balance = 0.0;
    const wallet = await Wallet.create({ user_id, number, balance });
    newUser.wallet_number = format(wallet).number;
    return res.status(201).json(newUser);
});

const getUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find({ type: 'user' });
    value = []
    for (let user of users) {
        value.push(format(user))
    }
    return res.json(value);
});

const getUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.id, type: 'user' });
    if (!user) {
        return res.status(404).json({ "error": "User not found" });
    }
    return res.status(200).json(format(user));
});

const updateUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.user_id, type: 'user' });
    if (!user) {
        return res.status(404).json({ "error": "User not found" });
    }
    const updatedItems = {};
    if (req.body.email) {
        updatedItems.email = req.body.email;
        const exist = await User.findOne({ email: req.body.email })
        if (exist) {
            return res.status(409).json({ "error": "The email already exists" });
        }
    }
    if (req.body.password) {
        updatedItems.password = await hashPassword(req.body.password);
    }
    if (req.body.pnumber) {
        updatedItems.pnumber = req.body.pnumber
    }
    if (req.body.fname) {
        updatedItems.pnumber = req.body.fname
    }
    if (req.body.lname) {
        updatedItems.pnumber = req.body.lname
    }
    await User.findByIdAndUpdate(req.params.id, { $set: updatedItems }, { new: true })
    const newUser = await User.findOne({ _id: req.params.id, type: 'user'});
    return res.status(200).json(format(newUser));
});

// const testEmail = expressAsyncHandler(async (req, res) => {
    
//     await sendEmail();
//     return res.json({"status": "sent"})
// })


module.exports = { createUser, getUsers, getUser, updateUser}