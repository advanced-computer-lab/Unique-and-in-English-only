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
        required: false,
        unique: true,
    },
    PassportNumber: {
        type: String,
        required: false,
        unique: true,
    },
    Admin: {
        type: Boolean,
        required: false,

    },
    Password: {
        type: String,
        required: false,
    },
    Tickets: {
        type: Array,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;