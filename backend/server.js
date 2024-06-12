const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const connectDB = require('./utils/db.js')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { AuthenticateUser, verifyUser, AuthenticateCarrier, verifyCarrier, verifyAdmin, verifyCarrierUserAndAdmin } = require('./utils/auth.js')
const cors = require('cors');
require('./utils/scheduler.js')

const corsOptions = {
    origin: '*',
  };

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

connectDB();


app.get('/', (req, res) => {
    res.json({ 'status': 'success', 'message': 'Welcome to the Ngreen API' })
})
app.get('/status', (req, res) => {
    res.json({ 'status': 'success' })
})
app.get('/database', (req, res) => {
    mongoose.connection.on('error', (err) => {
        return res.json({ 'status': `Database is down with error: ${err}` });
    });
    return res.json({ 'status': 'Database is up and running' })
})

app.post('/auth/users', AuthenticateUser)
app.post('/auth/carriers', AuthenticateCarrier)
app.use('/admins', verifyAdmin ,require('./controllers/admin/admin.js'))

app.use('/users', require('./controllers/users/user.js'))
app.use('/wallets', require('./controllers/wallets/wallet.js'))
app.use('/transactions', require('./controllers/transactions/transaction.js'))
app.use('/carriers', require('./controllers/carriers/carrier.js'))
app.use('/orders', require('./controllers/orders/order.js'))
app.use('/ratings', require('./controllers/ratings/rating.js'))
app.use('/otps', require('./controllers/otps/otp.js'))

app.all('*', (req, res)=> {
    res.status(400).json({'error': 'Not Found'})
})


//For testing
module.exports = app;

app.listen(port, () => {
    console.log('welcome to NGREEN, YOur ultimate Courier server')
})