const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

async function signInController(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        authenticateUserForSignIn(res, user);
        res.send("");
    } catch (error) {
        handleSignInError(error);
    }
}

function authenticateUserForSignIn(res, user) {
    const token = jwt.sign({ username: user.username, _id: user._id, role: user.role }, "MyPass");
    console.log("HII")
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3000 * 1000 });

}


function handleSignInError(error) {
    if (err.message.includes("incorrect password"))
        //Here handle the error when entering incorrect password
        res.send("sign-in", { error: "incorrect password" });
    else if (err.message.includes("incorrect Email"))
        //Here handle the error when entering incorrect email
        res.send("/sign-in");
    else {
        //process failed please try again
        res.send("/sign-in");
    }
}

module.exports = signInController;