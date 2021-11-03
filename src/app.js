const express = require("express");
const mongoose = require('mongoose');


// to read the .env file
const dotenv = require('dotenv');
dotenv.config();
const dbUrl = process.env.DBURL;
require('dotenv').config();



const app = express();
const port = process.env.PORT || "3000";
const User = require('./Models/User');
const Flight = require('./Models/Flight');

// console.log(dbUrl);

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("MongoDB is now connected"))
    .catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});



app.get("/", (req, res) => {
    res.send("Home page");

});

app.post("/createFlight", (req, res) => {
    // req.body();
    const flightNumber = req.body.flightNumber;
    const departureTime = req.body.departureTime;
    const arrivalTime = req.body.arrivalTime;
    const economySeatsNumber = req.body.economySeatsNumber;
    const buisnessSeatsNumber = req.body.buisnessSeatsNumber;
    const departurePort = req.body.departurePort;
    const arrivalPort = req.body.arrivalPort;

    const flight = new Flight({
        FlightNumber: flightNumber,
        DepartureTime: departureTime,
        ArrivalTime: arrivalTime,
        EconomySeatsNumber: economySeatsNumber,
        BuisnessSeatsNumber: buisnessSeatsNumber,
        DeparturePort: departurePort,
        ArrivalPort: arrivalPort
    });

    flight.save().then((result) => {

    });




})