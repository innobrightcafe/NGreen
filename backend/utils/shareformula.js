// Description: This file contains the logic for sharing the transaction amount between the admin, carrier, and agent.
const Order = require('../models/orderModel.js')
const User = require('../models/userModel.js')
const Wallet = require('../models/walletModel')
const Transaction = require('../models/transactionModel')
const Carrier = require('../models/carrierModel')
const logger = require('./logger.js')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('./formatter.js')


const sharer = async (order_id) => {
    let order = await Order.findById(order_id);
    if (!order) {
        throw new Error("No such order");
    }
    order = format(order);

    const transaction = format(await Transaction.findById(order.transaction_id ));
    console.log(transaction)
    const wallet = await Wallet.findOne({ user_id: transaction.user_id });
    if (!wallet) {
        throw new Error("User wallet not found");
    }

    const carrier = format(await Carrier.findById(order.carrier_id));
    if (!carrier.id) {
        throw new Error("No such carrier");
    }

    let agent3 = '';
    const agent = await User.findById(order.agent_id);
    const agent1 = await Carrier.findById(order.agent_id);
    if (!agent && !agent1) {
        agent3 = '';
    } else {
        if(agent){
            agent3 = format(agent).id;
        } else if(agent1){
            agent3 = format(agent1).id;
        }
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
    const carrierWallet = await Wallet.findOne({ user_id: order.carrier_id });
    if (!carrierWallet) {
        throw new Error("Carrier wallet not found");
    }
    carrierWallet.balance += carrierShare;

    // Credit agent if exists
    let agentWallet;
    if (agent3) {
        agentWallet = await Wallet.findOne({ user_id: agent3 });
        if (!agentWallet) {
            throw new Error("Agent wallet not found");
        }
        agentWallet.balance += agentShare;
    }

    // Credit admin
    const adminWallet = await Wallet.findOne({ number: 987654321 });
    if (!adminWallet) {
        throw new Error("Admin wallet not found");
    }
    adminWallet.balance += adminShare;

    // Save changes
    await wallet.save();
    await adminWallet.save();
    await carrierWallet.save();
    if (agent3) {
        await agentWallet.save();
    }

    const updatedOrder = await Order.findByIdAndUpdate(order.id, { $set: { status: "delivered" } }, { new: true });
    const updatedTransaction = await Transaction.findByIdAndUpdate(transaction.id, { $set: { status: "completed" } }, { new: true });

    logger.info(`Order status updated to: ${updatedOrder.status}, Transaction status updated to: ${updatedTransaction.status}`);

    return 1;
};

module.exports = { sharer }