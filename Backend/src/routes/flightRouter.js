const express = require('express');
const flightRouter = express.Router();
const flightController = require('../controllers/FlightController');

flightRouter.post("/createFlight", flightController.addFlight);
flightRouter.post("/searchFlight", flightController.getFlight);
flightRouter.get("/listFlights", flightController.listAllFlights);
flightRouter.delete("/deleteFlight/:id", flightController.deleteFlight);
flightRouter.put("/updateFlight/:id", flightController.updateFLight);
flightRouter.post("/searchFlightPassenger", flightController.searchFlightPassenger);
flightRouter.get("/showFlights", flightController.showFlights);
flightRouter.post("/setFlightID/:id", flightController.setFlightId);
flightRouter.get("/showReturnFlights", flightController.showReturnFlights);
flightRouter.post("/setReturnFlightID/:id", flightController.setReturnFlightId);
flightRouter.get("/getFlightById/:id",flightController.getFlightById)
flightRouter.get("/getOutgoingFlight",flightController.getOutgoingFlight)
flightRouter.get("/getReturnFlight",flightController.getReturnFlight)
flightRouter.get("/listReservations",flightController.listReservations)
flightRouter.post("/deleteTicket/:id", flightController.deleteFlight);
flightRouter.put("/updateUser", flightController.updateUser);

module.exports = flightRouter;
