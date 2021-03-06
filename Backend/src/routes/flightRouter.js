const express = require('express');
const flightRouter = express.Router();
const flightController = require('../controllers/FlightController');


//routes
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
flightRouter.get("/getReservationDetails", flightController.getReservationDetails);
flightRouter.post("/setSelectedOutgoingSeats", flightController.setSelectedOutgoingSeats);
flightRouter.post("/setSelectedReturnSeats", flightController.setSelectedReturnSeats);
flightRouter.get("/getSelectedOutgoingSeats", flightController.getSelectedOutgoingSeats);
flightRouter.get("/getSelectedReturnSeats", flightController.getSelectedReturnSeats);
flightRouter.post("/confirmTicket", flightController.confirmTicket);
flightRouter.get("/getFlightById/:id", flightController.getFlightById);
flightRouter.get("/getOutgoingFlight", flightController.getOutgoingFlight);
flightRouter.get("/getReturnFlight", flightController.getReturnFlight);
flightRouter.get("/getAdults", flightController.getAdults);
flightRouter.get("/getChildren", flightController.getChildren);
flightRouter.get("/listReservations", flightController.listReservations);
flightRouter.put("/updateUser", flightController.updateUser);
flightRouter.get("/getCabin", flightController.getCabin);
flightRouter.post("/ticketDeletion", flightController.deleteTicket);
flightRouter.get("/getUserById",flightController.getUserById);
flightRouter.post("/editReturnFlight", flightController.editReturnFlight);
flightRouter.post("/listReturnFlights", flightController.listReturnFlights);
flightRouter.post("/selectEditedReturnFlight", flightController.selectEditedReturnFlight);
flightRouter.post("/setSelectededitingReturnSeats", flightController.setSelectedReturnSeats);
flightRouter.get("/getOldTicketAndNewFlight", flightController.getOldTicketAndNewFlight);
flightRouter.post("/editReturnFlightConfirmation", flightController.editReturnFlightConfirmation);
flightRouter.post("/sendEmailOfFlight",flightController.sendEmailOfFlight);


module.exports = flightRouter;
