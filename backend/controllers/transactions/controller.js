const expressAsyncHandler = require('express-async-handler')
const User = require('../../models/userModel')
const Wallet = require('../../models/walletModel')
const Transaction = require('../../models/transactionModel')
const logger = require('../../utils/logger')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')


const createTransaction = expressAsyncHandler(async (req, res) => {
    const { user_id, type, amount, number, } = req.body
    let user = await User.findById(user_id)
    user = format(user)
    let wallet = await Wallet.findOne({ number, user_id })
    if (user.type !== 'admin' || !wallet) {
        return res.status(400).json({'status': 'Error! You have no permision to make this transaction'})
    }
    logger.info(`User ${user.email} is making a transaction ${type} of ${amount} with wallet number ${number}`)
    const description = req.body.description || ''
    wallet = format(wallet)
    let status = "pending"
    if (type === "debit") {
        if (wallet.balance < amount) {
            return res.status(402).json({"status": "Error! You don't have sufficient amount for this transaction. You have to fund your wallet"})
        }
    }
    if (type === "credit"){
        wallet.balance += amount
        status = "completed"
    }
    const trans = await Transaction.create({number, user_id, type, status, amount, description})
    await Wallet.findByIdAndUpdate(wallet.id, { $set: wallet }, { new: true })
    return res.status(200).json(format(trans));    
})

const getTransactions = expressAsyncHandler(async (req, res) => {
    let transactions = await Transaction.find()
    transactions = transactions.map(transaction => format(transaction))
    return res.status(200).json(transactions)
})

const getTransaction = expressAsyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id)
    return res.status(200).json(format(transaction))
})

module.exports = { createTransaction, getTransactions, getTransaction}