const express = require('express');
const flightRouter = express.Router();
const flightController = require('../controllers/FlightController');

flightRouter.post("/createFlight", flightController.addFlight);


module.exports = flightRouter;
