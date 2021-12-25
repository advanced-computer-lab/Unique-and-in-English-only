const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

var Publishable_Key = 'pk_test_51K69PxHSnuUCIvbwdqHkVQzUOiDz7lPbkuI0ES8nGf7NJyp1q2apcATscjtzJfoH3dil22wMvjnGA3xj9GCESc7m00drV3YzVF'
var Secret_Key = 'sk_test_51K69PxHSnuUCIvbw7EuFbCCSmWkKBscPONjHcEFdcEsOO4CmMWlTdBb6QFFvGbBsspU6yWW96rTc64Icf2V1YJZZ008qRLI55I'

const stripe = require('stripe')(Secret_Key)

async function signInController(req, res) {

    const { Email, Password } = req.body;
    try {
        const user = await User.login(Email, Password);
        authenticateUserForSignIn(res, user);
        res.send("success");

    } catch (error) {
        //console.log(error);
        // Access - Control - Allow - Origin:
        res.send("invalid username or pass");
    }
}

function authenticateUserForSignIn(res, user) {
    const token = jwt.sign({ username: user.Username, _id: user._id, admin: user.Admin, email: user.Email }, "MyPass");
    console.log("authenticate");
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3000 * 1000 });
    res.cookie("role", { admin: user.Admin })

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
        res.send("success");
    }
    catch (err) {
        console.log(err.message);
        var error = "error";
        if (err.message.includes("Email_1 dup key"))
            error = "this email is already registered";
        else if (err.message.includes("UserName_1 dup key"))
            error = "This username is already registered";
        else if (err.message.includes("PassportNumber_1 dup key"))
            error = "Passport number already linked";
        res.send(error)
    }
}
async function logOutController(req, res) {
    res.cookie('jwt', '', { maxAge: -1 });
    res.cookie('role', '', { maxAge: -1 });
    res.send();
}

const pay = async (req, res) => {
    const uuid = require('uuid');
    const { product, token } = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);

    const idempontencyKey = uuidv4();

    return stripe.customers.create({
        email: token.email,
        source: token.id,
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,


        })
    })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => console.log(err))
}
function verifyUserToken(req) {
    const token = req.cookies.jwt;
    if (token) {
        const decodedToken = jwt.verify(token, "MyPass");
        console.log("Num2")
        console.log(decodedToken);
        if (decodedToken) {
            return authorizationForUser(decodedToken);
        }
    }
    else {
        return authorizationForGuest();
    }

}

// verifies the token and decodes it
function decodeTheToken(token) {
    jwt.verify(token, "MyPass", (err, decodedToken) => {
        if (err) {
            console.log(err.message);
            return {};
        } else {
            return decodedToken;
        }
    });

}

function authorizationForUser(decodedToken) {
    _id = decodedToken._id;
    admin = decodedToken.admin;
    email = decodedToken.email;
    return { email, _id, admin, role: "User" };
}

function authorizationForGuest() {
    return { role: "viewer" };
}
function editPassword(req, res) {
    console.log("Edit Password came here")
    const authObject = verifyUserToken(req);
    if (authObject.role == "viewer") {
        return;
    }
    const email = authObject.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    try {
        User.editPassword(email, oldPassword, newPassword);
        res.send({ message: "success" })
    }
    catch (err) {
        res.send({ err: err.message })

    }

}


module.exports = {
    signUp,
    signInController,
    logOutController,
    pay,
    verifyUserToken,
    editPassword,
};