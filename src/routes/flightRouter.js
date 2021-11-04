const express = require('express');
const flightRouter = express.Router();
const flightController = require('../controllers/FlightController');

flightRouter.post("/createFlight", flightController.addFlight);
flightRouter.get("/searchFlight", flightController.getFlight);
flightRouter.get("/listFlights", flightController.listAllFlights);




module.exports = flightRouter;
