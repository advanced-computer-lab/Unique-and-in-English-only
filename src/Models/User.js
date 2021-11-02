const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
    },
    Role: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;