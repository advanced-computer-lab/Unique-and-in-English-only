const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');




//Routers
const router = require("./routes/router");
const flightRouter = require("./routes/flightRouter");
const userRouter = require("./routes/userRouter");

// to read the .env file
const dotenv = require('dotenv');
dotenv.config();
const dbUrl = process.env.DBURL;
console.log(dbUrl);
require('dotenv').config();



const app = express();
const port = process.env.PORT || "8000";
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,

    resave: false
}));
app.use(cookieParser());

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("MongoDB is now connected"))
    .catch(err => console.log(err));


// app.use(function (req, res, next) {
//     req.headers['content-type'] = 'application/json';
//     next();
// });
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});

app.all('*', setResHeader);

function setResHeader(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}


app.use('/', router);
app.use('/flight', flightRouter);
app.use('/user', userRouter);


// app.use(bodyParser.urlencoded())
// app.use(bodyParser.urlencoded({
//     extended: true
// }));







