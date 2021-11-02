const express = require("express");
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || "3000";
const User = require('./models/User');

app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});



app.get("/", (req, res) => {
    res.send("Home page");

});

