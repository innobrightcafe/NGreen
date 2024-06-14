const expressAsyncHandler = require('express-async-handler')
const Order = require('../../models/orderModel')
const User = require('../../models/userModel')
const Wallet = require('../../models/walletModel')
const Carrier = require('../../models/carrierModel')
const Transaction = require('../../models/transactionModel')
const logger = require('../../utils/logger')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')


const createOrder = expressAsyncHandler(async (req, res) => {
    const { amount } = req.body
    const user_id = req.user_id
    const user = format(await User.findById(user_id))
    if (!user.id) {
        return res.status(404).json({ message: 'User not found' })
    }
    const wallet = format(await Wallet.findOne({ user_id }))
    if (!wallet.id) {
        return res.status(404).json({ message: 'Wallet not found' })
    }
    logger.info(`User ${user.email} is creating an order of ${amount} with wallet number ${wallet.number}`)
    const description = req.body.description || ''
    const status = "pending"
    const type = "debit"
    if (wallet.balance < amount) {
        return res.status(402).json({ "status": "Error! You don't have sufficient amount for this transaction. You have to fund your wallet" })
    }

    const transaction_id = format(await Transaction.create({ number: wallet.number, user_id, type, status, amount, description })).id
    const order = await Order.create({ user_id, amount, status, description, transaction_id })
    return res.status(201).json(format(order))

})

const getOrders = expressAsyncHandler(async (req, res) => {
    const user_id = req.user_id
    let orders = ''
    if (req.user_type == "admin") {
        orders = await Order.find()
    } else if (req.user_type == "user") {
        orders = await Order.find({user_id})
    } else {
        orders = await Order.find({carrier_id: user_id})
    }
    if (!orders) {
        return res.status(200).json({"status": "No Order"})
    }
    orders = orders.map(order => format(order))
    return res.status(200).json(orders)
})

const getOrder = expressAsyncHandler(async (req, res) => {
    let order =''
    const user_id = req.user_id
    if (req.user_type == "admin") {
        order = await Order.findById(req.params.id)
    } else if (req.user_type == "user") {
        order = Order.findOne({_id: req.params.id, user_id})
    } else {
        order = await Order.findOne({_id: req.params.id, carrier_id: user_id})
    }
    if (!order) {
        return res.status(200).json({"status": "No Such Order"})
    }
    return res.status(200).json(format(order))
})

const updateOrder = expressAsyncHandler(async (req, res) => {
    const user_id = req.user_id
    const user = format(await User.findById(user_id))
    if (!user.id) {
        return res.status(404).json({ message: 'User not found' })
    }
    updated = {}
    if (req.body.status) {
        updated.status = req.body.status
    }
    if (req.body.amount) {
        updated.amount = req.body.amount
    }
    if (req.body.carrier_id) {
        const carrier = await Carrier.findById(req.body.carrier_id)
        if(!carrier) {
            return res.status(404).json({ message: 'Carrier not found' })
        }
        updated.carrier_id = req.body.carrier_id
        updated.status =  'inprogress'
    }
    if (req.body.description) {
        updated.description = req.body.description
    }
    const order = await Order.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    return res.status(200).json(format(order))
})

// const approveOrder = expressAsyncHandler(async (req, res) => {
//     const { user_id } = req.body
//     let order = await Order.findOne({ _id: req.params.id });
//     if (!order) {
//         return res.status(404).json({ "error": "Order not found" });
//     }
//     order = format(order)
//     let user = await User.findById(user_id)
//     user = format(user)
//     let wallet = Wallet.findOne({ number: order.number })
//     if (!wallet) {
//         res.status(404).json({ 'status': 'Error! Wallet not found' })
//     }
//     if (user.type !== 'admin') {
//         return res.status(400).json({ 'status': 'Error! You have no permision to approve this order' })
//     }
//     const newWallet = { balance: wallet.balance }
//     const updatedItems = {};
//     updatedItems.status = "completed"
//     newWallet.balance -= order.amount
//     await Wallet.findByIdAndUpdate(wallet.id, { $set: newWallet }, { new: true })
//     return res.status(200).json(format(order))
// })

module.exports = { createOrder, getOrders, getOrder, updateOrder }