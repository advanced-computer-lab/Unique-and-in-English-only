const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const bodyparser = require('body-parser');
dotenv.config({ path: 'config.env' });


const app = express();
const port = process.env.PORT || 3000;
const User = require('./models/User');

app.use(bodyparser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});

app.use('/', require('./routes/router.js'));





