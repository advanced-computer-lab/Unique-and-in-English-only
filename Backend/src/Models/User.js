const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    FirstName: {
        type: String,
        required: true,
    },
     LastName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    PassportNumber: {
        type: String,
        required: true,
        unique: true,
    },
    Admin: {
        type: Boolean,
        required: true,

    },
    Password: {
        type: String,
        required: true,
    },
    Tickets:{
        type: Array
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;