const expressAsyncHandler = require('express-async-handler');
const Carrier = require('../../models/carrierModel.js');
const User = require('../../models/userModel.js')
const { hashPassword, comparePassword } = require('../../utils/password.js')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')
const Wallet = require('../../models/walletModel.js');
const path = require('path');

const createCarrier = expressAsyncHandler(async (req, res) => {
    const exist = await Carrier.findOne({ email: req.body.email })
    if (exist) {
        return res.status(409).json({ "error": "The email already exists" });
    }
    let agent_id = req.body.agent_id || '';
    if (agent_id) {
        let agent = await User.findById(agent_id)
        if (agent) {
            agent.refer += 1;
            await agent.save();
        } else {
            agent = await Carrier.findById(agent_id)
            if (agent) {
                agent.refer += 1;
                await agent.save();
            } else {
                agent_id = ''
            }
        }
    }
    if (!agent_id) {
        agent_id = process.env.ADMIN_ID
    }
    const hashpassword = await hashPassword(req.body.password);
    const rating = '0.0'
    const carrier = await Carrier.create({ rating, account_number: req.body.account_number, account_bank: req.body.account_bank, account_name: req.body.account_name, agent_id, active: true, approved: false, fname: req.body.fname, lname: req.body.lname, password: hashpassword, refer: 0, pnumber: req.body.pnumber, email: req.body.email });
    const newCarrier = format(carrier);
    const user_id = newCarrier.id;
    const number = Math.floor(Math.random() * 1000000000);
    const balance = 0.0;
    const wallet = await Wallet.create({ user_id, number, balance });
    newCarrier.wallet_number = wallet.number;
    return res.status(201).json(newCarrier);
});

const getCarriers = expressAsyncHandler(async (req, res) => {
    let carriers = ''
    if (req.query.active || req.query.approved) {
        const active = req.query.active || true
        const approved = req.query.approved || true
        carriers = await Carrier.find({ active, approved });
    } else {
        carriers = await Carrier.find({});
    }
    const value = []
    for (let carrier of carriers) {
        value.push(format(carrier))
    }
    return res.json(value);
});

const getCarrier = expressAsyncHandler(async (req, res) => {
    const carrier = await Carrier.findOne({ _id: req.params.id });
    if (!carrier) {
        return res.status(404).json({ "error": "Carrier not found" });
    }
    return res.status(200).json(format(carrier));
});

const updateCarrier = expressAsyncHandler(async (req, res) => {
    const carrier = await Carrier.findOne({ _id: req.user_id });
    if (!carrier) {
        return res.status(404).json({ "error": "Carrier not found" });
    }
    if (req.user_type !== 'admin' && !carrier) {
        return res.status(403).json({ "error": "You are not allowed to perform this transaction" });
    }
    const updatedItems = {};
    if (req.body.email) {
        updatedItems.email = req.body.email;
        const exist = await Carrier.findOne({ email: req.body.email })
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
    if (req.body.account_name) {
        updatedItems.account_name = req.body.account_name
    }
    if (req.body.account_number) {
        updatedItems.account_number = req.body.account_number
    }
    if (req.body.account_bank) {
        updatedItems.account_bank = req.body.account_bank
    }
    await Carrier.findByIdAndUpdate(req.params.id, { $set: updatedItems }, { new: true })
    const newCarrier = await Carrier.findOne({ _id: req.params.id });
    return res.status(200).json(format(newCarrier));
});

const approveCarrier = expressAsyncHandler(async (req, res) => {
    const carrier = await Carrier.findOne({ _id: req.params.id });
    if (!carrier) {
        return res.status(404).json({ "error": "Carrier not found" });
    }
    if (!carrier.account_bank || !carrier.account_name || !carrier.account_number || !carrier.active || !carrier.pnumber) {
        return res.status(400).json({ "error": "The user need to update all his details before approval" })
    }
    const carrier_id = req.params.id
    const directoryPath = '../../uploads'
    const filename1 = `license_${carrier_id}`;
    const filename2 = `idcard_${carrier_id}`;
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(400).json({'error': 'ERROR! Occur'})
        }
        const fileExist1 = files.some(file => path.parse(file).name === filename1);
        const fileExist2 = files.some(file => path.parse(file).name === filename2);

        if (!fileExist1 && !fileExist2) {
            return res.status(400).json({ "error": "The user need to update all his details before approval" })       
        }
    });
    const updatedItems = {};
    updatedItems.approved = true
    await Carrier.findByIdAndUpdate(req.params.id, { $set: updatedItems }, { new: true })
    const newCarrier = await Carrier.findOne({ _id: req.params.id });
    return res.status(200).json(format(newCarrier));
});

module.exports = { createCarrier, getCarriers, getCarrier, updateCarrier, approveCarrier }