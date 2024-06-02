const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())


app.get('/', (req, res) => {
    res.json({ 'status': 'success', 'message': 'Welcome to the Ngreen API' })
})
app.get('/status', (req, res) => {
    res.json({ 'status': 'success' })
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