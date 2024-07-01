const express = require('express');
require('dotenv').config();
const fs = require('fs');
const app = express();
const connectDB = require('./utils/db.js')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { AuthenticateUser, verifyUser, AuthenticateCarrier, verifyCarrier, verifyAdmin, verifyCarrierUserAndAdmin } = require('./utils/auth.js')
const { UserToken, CarrierToken } = require('./utils/cache_auth.js');
const { initializePayment, verifyPayment } = require('./utils/paystack.js');
const { uploadeFile } = require('./utils/image_upload.js')
const { sendEmail } = require('./utils/mailer.js')
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./utils/scheduler.js')
require('./utils/google_auth.js')
const { createAuthUser, createAuthCarrier, createSession } = require('./utils/create_user.js')
const { cache } = require('./utils/cache.js')

const userSession1 = createSession('type', 'user', 'purpose', 'signup');
const userSession2 = createSession('type', 'user', 'purpose', 'login');
const carrierSession1 = createSession('type', 'carrier', 'purpose', 'signup');
const carrierSession2 = createSession('type', 'carrier', 'purpose', 'login');


const corsOptions = {
  origin: '*',
};

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

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


//Google Auth

app.get('/auth/user/google', userSession1,
  passport.authenticate('google', { scope: ['email', 'profile'] }
));
app.get('/auth/carrier/google', carrierSession1,
  passport.authenticate('google', { scope: ['email', 'profile'] }
));
app.get('/user/login/google', userSession2,
  passport.authenticate('google', { scope: ['email', 'profile'] }
));
app.get('/carrier/login/google', carrierSession2,
  passport.authenticate('google', { scope: ['email', 'profile'] }
));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/protected', isLoggedIn, async (req, res) => {
  const value = {'email': req.user.email, 'fname': req.user.given_name, 'lname': req.user.family_name}
  if (cache.get('type') === 'user') {
    if (cache.get('purpose') === 'signup') {
      const a = await createAuthUser(value)
      if (a !== 0) {
        return res.status(201).json(a)
      } else {
        return res.status(400).json({ 'error': 'User already exists' })
      }
    } else {
        cache.set('google', 'true')
        res.redirect(`/auth/users/token?email=${value.email}`)
      } 
    } else {
      if (cache.get('purpose') === 'signup') {
        const a = await createAuthCarrier(value)
        if (a !== 0) {
          return res.status(201).json(a)
        } else {
          return res.status(400).json({ 'error': 'Carrier already exists' })
        }
      } else {
          cache.set('google', 'true')
          res.redirect(`/auth/carriers/token?email=${value.email}`)
        } 
  }
});

app.get('/logout', (req, res) => {
  (err) => {
    if (err) { return next(err); }
    res.redirect('/');
  }
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.json({ 'error': 'Failed to authenticate...' });
});

//Google Auth End


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

app.use(express.static('uploads'));
app.post('/upload', verifyCarrier, uploadeFile)
app.post('/auth/users', UserToken)
app.post('/auth/carriers', CarrierToken)
app.post('/auth/users/token', AuthenticateUser)
app.post('/auth/carriers/token', AuthenticateCarrier)
app.get('/auth/users/token', AuthenticateUser)
app.get('/auth/carriers/token', AuthenticateCarrier)
app.post('/sendmail', verifyCarrierUserAndAdmin, async (req, res) => {
  if (!req.body.email || !req.body.head || !req.body.message) {
    return res.status(400).json({ error: "Invalid request: email, head or message not in request body" });
  }
  const email = req.body.email.trim();
  try {
    await sendEmail(email, req.body.head, req.body.message);
    return res.status(200).json({ "message": "Email sent successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})
app.use('/admins', verifyAdmin, require('./controllers/admin/admin.js'))
app.use('/users', require('./controllers/users/user.js'))
app.use('/wallets', require('./controllers/wallets/wallet.js'))
app.use('/transactions', require('./controllers/transactions/transaction.js'))
app.use('/carriers', require('./controllers/carriers/carrier.js'))
app.use('/orders', require('./controllers/orders/order.js'))
app.use('/ratings', require('./controllers/ratings/rating.js'))
app.use('/otps', require('./controllers/otps/otp.js'))

app.all('*', (req, res) => {
  res.status(400).json({ 'error': 'Endpoints Not Found' })
})


//For testing
module.exports = app;

app.listen(port, () => {
  console.log('welcome to NGREEN, Your ultimate Courier server')
})