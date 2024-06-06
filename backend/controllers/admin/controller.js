const expressAsyncHandler = require('express-async-handler');
const Admin = require('../.../../../models/userModel.js');
const { hashPassword, comparePassword } = require('../../utils/password.js')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')

const createAdmin = expressAsyncHandler(async (req, res) => {
    const exist = await Admin.findOne({ email: req.body.email })
    if (exist) {
        return res.status(409).json({ "error": "The email already exists" });
    }
    const password = req.body.password
    const hashpassword = await hashPassword(password);
    const admin = await Admin.create({ fname: req.body.fname, lname: req.body.lname, password: hashpassword, refer: 0, pnumber: req.body.pnumber, type: 'admin', email: req.body.email});
    res.status(201).json(format(admin));
});

const getAdmins = expressAsyncHandler(async (req, res) => {
    const admins = await Admin.find({ type: 'admin' });
    value = []
    for (let admin of admins) {
        value.push(format(admin))
    }
    return res.json(value);
});

const getAdmin = expressAsyncHandler(async (req, res) => {
    const admin = await Admin.findOne({ _id: req.params.id, type: 'admin' });
    if (!admin) {
        return res.status(404).json({ "error": "Admin not found" });
    }
    return res.status(200).json(format(Admin));
});

const updateAdmin = expressAsyncHandler(async (req, res) => {
    const admin = await Admin.findOne({ _id: req.params.id, type: 'admin' });
    if (!admin) {
        return res.status(404).json({ "error": "Admin not found" });
    }
    const updatedItems = {};
    if (req.body.email) {
        updatedItems.email = req.body.email;
        const exist = await Admin.findOne({ email: req.body.email })
        if (exist) {
            return res.status(409).json({ "error": "The email already exists" });
        }
    }
    if (req.body.password) {
        const pass = req.body.password;
        const hashpassword = await hashPassword(pass);
        updatedItems.password = hashpassword;
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
    await Admin.findByIdAndUpdate(req.params.id, { $set: updatedItems }, { new: true })
    const newAdmin = await Admin.findOne({ _id: req.params.id, type: 'admin'});
    return res.status(200).json(format(newAdmin));
});


module.exports = { createAdmin, getAdmins, getAdmin, updateAdmin }