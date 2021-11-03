const Flight = require("../Models/Flight");


const addFlight = (req, res) => {
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
    flight.save();

}

const getFlight = (req, res) => {


}

module.exports =
{
    addFlight
}