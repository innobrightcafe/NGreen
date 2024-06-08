const Transaction = require('../models/transactionModel');
const moment = require('moment');

const cleaner = async () => {
    try {
        const eightHoursAgo = moment().subtract(1, 'minutes').toDate();

        await Transaction.updateMany(
            { 
                status: 'pending',
                updatedAt: { $lt: eightHoursAgo }
            },
            { $set: { status: 'failed' } }
        );

        console.log('All pending transactions older than 8 hours have been updated to failed');
    } catch (error) {
        console.error('An error occurred while updating the transactions', error);
    }
}

module.exports = { cleaner} ;