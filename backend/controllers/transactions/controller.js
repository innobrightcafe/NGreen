const expressAsyncHandler = require('express-async-handler')
const User = require('../../models/userModel')
const Wallet = require('../../models/walletModel')
const Transaction = require('../../models/transactionModel')
const Carrier = require('../../models/carrierModel')
const logger = require('../../utils/logger')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')


const createTransaction = expressAsyncHandler(async (req, res) => {
    const { user_id, type, amount, number } = req.body
    let user = await User.findById(user_id)
    const carrier = await Carrier.findById(user_id)
    user = format(user)
    let wallet = await Wallet.findOne({ number, user_id })
    if (user.type !== 'admin' || (!carrier && !wallet)) {
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

const approveTransaction = expressAsyncHandler(async (req, res) => {
    const { user_id  } = req.body
    let transaction = await Transaction.findOne({ _id: req.params.id });
    if (!transaction) {
        return res.status(404).json({ "error": "Transaction not found" });
    }
    transaction = format(transaction)
    let user = await User.findById(user_id)
    user = format(user)
    let wallet = Wallet.findOne({ number: transaction.number })
    if (!wallet) {
        res.status(404).json({'status': 'Error! Wallet not found'})
    }
    if (user.type !== 'admin' ) {
        return res.status(400).json({'status': 'Error! You have no permision to approve this transaction'})
    }
    const newWallet = {balance: wallet.balance}
    const updatedItems = {};
    updatedItems.status = "completed"
    newWallet.balance -= transaction.amount
    await Carrier.findByIdAndUpdate(req.params.id, { $set: updatedItems }, { new: true })
    const newTrans = await Transaction.findOne({ _id: req.params.id });
    await Wallet.findByIdAndUpdate(wallet.id, { $set: newWallet }, { new: true })
    return res.status(200).json(format(newTrans));
})

module.exports = { createTransaction, getTransactions, getTransaction, approveTransaction  }