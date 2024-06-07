const expressAsyncHandler = require('express-async-handler')
const Wallet = require('../../models/walletModel')
const User = require('../../models/userModel')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')

const createWallet = expressAsyncHandler(async (req, res) => {
    const { user_id } = req.body
    if (!user_id) {
        res.status(400).json({ message: 'user_id is required' })
    }
    const user = await User.findById(user_id);
    if (!user) {
        res.status(404).json({ message: 'User not found' })
    }
    const number = Math.floor(Math.random() * 1000000000)
    const balance = 0.0
    const wallet = await Wallet.create({ user_id, number, balance })
    res.status(201).json(format(wallet))
})

const getWallets = expressAsyncHandler(async (req, res) => {
    const wallets = await Wallet.find()
    const value = []
    wallets.forEach(wallet => {
        value.push(format(wallet))
    })
    res.json(value)
})

const getWallet = expressAsyncHandler(async (req, res) => {
    const wallet = await Wallet.findById(req.params.id)
    if (!wallet) {
        res.status(404).json({ message: 'Wallet not found' })
    }
    res.json(format(wallet))
})


module.exports = {createWallet, getWallets, getWallet}