const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 900, checkperiod: 900 });

module.exports = cache;
