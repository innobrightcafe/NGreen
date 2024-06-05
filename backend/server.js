const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const connectDB = require('./utils/db.js')
const port = process.env.PORT || 5000
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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
    if (mongoose.connection.readyState === 0) {
        res.json({'status': 'Database is up and running'})
    } else {
        res.json({'status': 'Database is down'})
    }
})

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ status: 'Something broke!' });
});


//For testing
module.exports = app;

app.listen(port, () => {
    console.log('welcome to NGREEN, YOur ultimate Rider server')
})