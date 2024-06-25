const express = require('express');
const dotenv = require('dotenv').config();
const fs = require('fs');
const app = express();
const connectDB = require('./utils/db.js')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { AuthenticateUser, verifyUser, AuthenticateCarrier, verifyCarrier, verifyAdmin, verifyCarrierUserAndAdmin } = require('./utils/auth.js')
const { initializePayment, verifyPayment } = require('./utils/paystack.js');
const { uploadeFile } = require('./utils/image_upload.js')
const cors = require('cors');
require('./utils/scheduler.js')

const corsOptions = {
    origin: '*',
  };

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));


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


app.get('/download-log', (req, res) => {
  const logFilePath = './app.log';
  
  // Set the filename that will be suggested to the client
  const fileName = 'logfile.log';
  
  res.download(logFilePath, fileName, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error occurred during the download');
    }
  });
});

app.get('/check-file', (req, res) => {
    const { type, id } = req.query;
    
    const filename = `${req.query.type}_${req.query.id}.${req.query.extension}`;
    const filePath = './uploads/' + filename;
    const pat = `${req.get('host')}/${filename}`;
    
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // File does not exist
        return res.json({ exists: false });
      }
      // File exists
      return res.json({ exists: true, 'path': pat });
    });
  });

  app.get('/download-file', (req, res) => {
    const { type, id, extension } = req.query;
    
    const filename = `${type}_${id}.${extension}`;
    const filePath = './uploads/' + filename;
    
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ error: "File does not exist" });
      }
      res.download(filePath, filename, (downloadError) => {
        if (downloadError) {
          // Handle errors during the download process
          console.error(downloadError);
          res.status(500).send("Error occurred during the download");
        }
      });
    });
  });

//paystack
app.post('/paystack/pay', async (req, res) => {
    const { email, amount } = req.body;
    try {
      const response = await initializePayment(email, amount);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get('/paystack/verify/:reference', async (req, res) => {
    const { reference } = req.params;
    try {
      const response = await verifyPayment(reference);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.use(express.static('uploads'));
app.post('/upload', verifyCarrier, uploadeFile)
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
    console.log('welcome to NGREEN, Your ultimate Courier server')
})