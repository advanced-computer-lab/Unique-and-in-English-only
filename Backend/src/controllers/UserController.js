const User = require("../Models/User");
const jwt = require("jsonwebtoken");

async function signInController(req, res) {
    const { Email, Password } = req.body;
    try {
        const user = await User.login(Email, Password);
        authenticateUserForSignIn(res, user);
        res.send();
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
}

function authenticateUserForSignIn(res, user) {
    const token = jwt.sign({ username: user.Username, _id: user._id, admin: user.Admin }, "MyPass");
    // console.log("authenticate")
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3000 * 1000 });

}


function handleSignInError(err, res) {
    console.log(err.message)
    if (err.message.includes("incorrect password"))
        //Here handle the error when entering incorrect password
        res.send({ error: "incorrect password" });
    else if (err.message.includes("incorrect Email"))
        //Here handle the error when entering incorrect email
        res.send({ error: "incorrect email" });
    else {
        //process failed please try again
        res.send();
    }
}

const signUp = async (req, res) => {
    const userInfo = req.body;
    // userInfo.Tickets = new Array();
    console.log(userInfo);
    try {
        const user = await User.create(userInfo);
        res.send();
    }
    catch (err) {
        console.log(err.message);
        var error = "";
        if (err.message.includes("Email_1 dup key"))
            error = "Duplicate Email";

    }
}
async function logOutController(req, res) {
    res.cookie('jwt', '', { maxAge: -1 });
    res.send();
}


module.exports = {
    signUp,
    signInController,
    logOutController
};