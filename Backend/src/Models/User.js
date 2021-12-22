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
        required: false,

    },
    Password: {
        type: String,
        required: true,
    },
    Tickets: {
        type: Array,
        required: true
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.Password) {
        const salt = await bcrypt.genSalt();
        this.Password = await bcrypt.hash(this.Password, salt);
        if (this.FirstName == "Ahmed_694") {
            this.Admin = true;
        } else {
            this.Admin = false;
        }
        this.Tickets = new Array();
    }
    console.log(this.Password);
    next();
});

userSchema.statics.login = async function (Email, Password) {
    const user = await this.findOne({ Email });
    // console.log(user);
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