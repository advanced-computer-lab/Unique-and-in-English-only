const express = require('express');
const flightRouter = express.Router();
const flightController = require('../controllers/FlightController');

flightRouter.post("/createFlight", flightController.addFlight);
flightRouter.get("/searchFlight", flightController.getFlight);
flightRouter.get("/listFlights", flightController.listAllFlights);
flightRouter.delete("/deleteFlight/:id",flightController.deleteFlight);
flightRouter.put("/updateFlight/:id",flightController.updateFLight)



module.exports = flightRouter;
