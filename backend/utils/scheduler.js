const cron = require('node-cron');
const logger = require('./logger');
const { cleaner }= require('./transcleaner');

// Schedule a task to log a message every hour
cron.schedule('5 * * * * *', async () => {
  try {
    logger.info('Start Transaction Cleaning Process...');
    await cleaner();
    logger.info('Stop Transaction Cleaning Process...');
  } catch (error) {
    logger.error('Error in the cleaning process:', error);
  }
});
