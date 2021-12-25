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
    },
    UserName: {
        type: String,
        required: true,
        unique: true,
    },
    HomeAddress: {
        type: String,
    },
    CountryCode: {
        type: String,
    },
    TelephoneNumber: {
        type: String,
    }

}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.Password) {
        const salt = await bcrypt.genSalt();
        this.Password = await bcrypt.hash(this.Password, salt);
        if (this.UserName == "Admin") {
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

userSchema.statics.editPassword = async function (Email, oldPassword, NewPassword) {
    const user = await this.findOne({ Email });
    // console.log(user);
    try {
        if (user) {

            const auth = await bcrypt.compare(oldPassword, user.Password);
            if (auth) {
                user.Password = NewPassword;
                await user.save();
            }
            throw Error("incorrect password");



        }
        throw Error("incorrect email");
    }
    catch (err) {
        ;
    }
};

const User = mongoose.model('User', userSchema);
module.exports = User;