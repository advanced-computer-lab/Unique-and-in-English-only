const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    if (this.username == "Ahmed_694") {
        this.role = "super-admin";
    } else if (this.username == "Mohamed") {
        this.role = "admin";
    } else {
        this.role = "user";
    }
    next();
});

userSchema.statics.login = async function (Email, Password) {
    const user = await this.findOne({ Email });
    if (user) {
        const auth = await bcrypt.compare(Password, user.Password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
};

const User = mongoose.model('User', userSchema);
module.exports = User;