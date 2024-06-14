const expressAsyncHandler = require('express-async-handler')
const Wallet = require('../../models/walletModel')
const User = require('../../models/userModel')
const Carrier = require('../../models/carrierModel')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')

const createWallet = expressAsyncHandler(async (req, res) => {
    const { user_id } = req.body
    if (!user_id) {
        return res.status(400).json({ message: 'user_id is required' })
    }
    const user = await User.findById(user_id);
    const carrier = await Carrier.findById(user_id);
    if (!user && !carrier) {
        return res.status(404).json({ message: 'User or Carrier not found' })
    }
    const number = Math.floor(Math.random() * 1000000000)
    const balance = 0.0
    const wallet = await Wallet.create({ user_id, number, balance })
    return res.status(201).json(format(wallet))
})

const getWallets = expressAsyncHandler(async (req, res) => {
    const wallets = await Wallet.find()
    const value = []
    wallets.forEach(wallet => {
        value.push(format(wallet))
    })
    return res.json(value)
})

const getWalletByAdmin = expressAsyncHandler(async (req, res) => {
    const user_id = req.params.id
    const wallet = await Wallet.findOne({user_id})
    if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' })
    }
    return res.json(format(wallet))
})

const getWalletByUser = expressAsyncHandler(async (req, res) => {
    const user_id = req.user_id
    const wallet = await Wallet.findOne({user_id})
    if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' })
    }
    return res.json(format(wallet))
})


module.exports = {createWallet, getWallets, getWalletByAdmin, getWalletByUser}