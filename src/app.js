const express = require("express");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


//Routers
const router = require("./routes/router");
const flightRouter = require("./routes/flightRouter");

// to read the .env file
const dotenv = require('dotenv');
dotenv.config();
const dbUrl = process.env.DBURL;
require('dotenv').config();



const app = express();
const port = process.env.PORT || "3000";


mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("MongoDB is now connected"))
    .catch(err => console.log(err));


app.use(bodyparser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});

app.use('/', router);
app.use('/flight', flightRouter);







