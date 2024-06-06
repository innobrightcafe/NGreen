const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    fname: String,
    lname: String,
    pnumber: String,
    refer:  Number,
    type: {
        type: String,
        enum: ['admin', 'user']
    } 
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema)