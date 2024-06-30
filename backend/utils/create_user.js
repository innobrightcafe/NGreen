const User = require('../models/userModel');
const Wallet = require('../models/walletModel');
const Carrier = require('../models/carrierModel');
const { processMongoDBObject: format } = require('./formatter')
const { cache } = require('./cache')



const createAuthUser = async (req) => {
    const exist = await User.findOne({ email: req.email })
    if (exist) {
        return 0;
    }
    const user = await User.create({ fname: req.fname, lname: req.lname, refer: 0, type: 'user', email: req.email});
    const user_id = user._id;
    const number = Math.floor(Math.random() * 1000000000);
    const balance = 0.0;
    const wallet = await Wallet.create({ user_id, number, balance });
    const newUser = format(user);
    newUser.wallet_number = wallet.number;
    return format(user);
}

const createAuthCarrier = async (req) => {
    const exist = await Carrier.findOne({ email: req.email })
    if (exist) {
        return 0;
    }
    const carrier = await Carrier.create({ fname: req.fname, lname: req.lname, refer: 0, pnumber: req.pnumber, email: req.email});
    const carrier_id = carrier._id;
    const number = Math.floor(Math.random() * 1000000000);
    const balance = 0.0;
    const wallet = await Wallet.create({ carrier_id, number, balance });
    const focarrier = format(carrier);
    focarrier.wallet_number = wallet.number;
    return focarrier;
}

function createSession(key1, value1, key2, value2) {
    return (req, res, next) => {
      if (req.session) {
        cache.set(key1, value1);
        cache.set(key2, value2);
      }
      next();
    };
  }

module.exports = { createAuthUser, createAuthCarrier, createSession }