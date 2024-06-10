// Description: This file contains the logic for sharing the transaction amount between the admin, carrier, and agent.
const Order = require('../models/orderModel.js')
const User = require('../models/userModel.js')
const Wallet = require('../models/walletModel')
const Transaction = require('../models/transactionModel')
const Carrier = require('../models/carrierModel')
const logger = require('./logger.js')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('./formatter.js')



const Sharer = async (order_id) => {

    const order = format(await Order.findById(order_id));
    if (!order.id) {
        throw new Error("No such order");
    }

    const transaction = format(await Transaction.find({ transaction_id: order.transaction_id }));
    const wallet = Wallet.find({ number: transaction.number });

    const carrier = format(await Carrier.findById(order.carrier_id));
    if (!carrier.id) {
        throw new Error("No such carrier");
    }
    let agent3 = ''
    const agent = format(await User.findById(order.agent_id));
    const agent1 = format(await Carrier.findById(order.agent_id));
    if (!agent.id && !agent1.id) {
        agent3 = ''
    } else {
        agent3 = agent.id
    }

    const agentShare = transaction.amount * 0.05;
    const carrierShare = transaction.amount * 0.30;
    let adminShare = transaction.amount * 0.65;
    if (!agent3) {
        adminShare = transaction.amount * 0.70;
    }

    logger.info(`Transaction amount: ${transaction.amount}`);
    logger.info(`Admin share: ${adminShare}`);
    logger.info(`Carrier share: ${carrierShare}`);
    if (agent3) {
        logger.info(`Agent share: ${agentShare}`);
    }
    // Debit user
    wallet.balance -= transaction.amount;

    // Credit carrier
    const carrierWallet = Wallet.find({ user_id: order.carrier_id });
    carrierWallet.balance += carrierShare;


    // Credit agent if exists
    if (agent3) {
        const agentWallet = Wallet.find({ user_id: agent3 });
        agentWallet.balance += agentShare;
    }
    logger.info(`User balance after transaction: ${wallet.balance}, Admin balance after transaction: ${adminWallet.balance}, Carrier balance after transaction: ${carrierWallet.balance}`);

    // Credit admin
    const adminWallet = Wallet.find({ number: 987654321 });
    adminWallet.balance += adminShare;


    // Save changes
    await wallet.save();
    await adminWallet.save();
    await carrierWallet.save();
    if (agent3) {
        await agentWallet.save();
    }
    logger.info
    await Order.findByIdAndUpdate(order.id, { $set: { status: "delivered" } }, { new: true })
    await Transaction.findByIdAndUpdate(transaction.id, { $set: { status: "completed" } }, { new: true })
    logger.info(`Order status updated to: ${updatedOrder.status}, Transaction status updated to: ${updatedTransaction.status}`);

    return 1
};

module.exports = { Sharer }