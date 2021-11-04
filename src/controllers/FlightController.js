const Flight = require("../Models/Flight");


const addFlight = (req, res) => {
    const flightNumber = req.body.FlightNumber;
    const departureTime = req.body.DepartureTime;
    const arrivalTime = req.body.ArrivalTime;
    const economySeatsNumber = req.body.EconomySeatsNumber;
    const buisnessSeatsNumber = req.body.BuisnessSeatsNumber;
    const departurePort = req.body.DeparturePort;
    const arrivalPort = req.body.ArrivalPort;
    console.log(req.body);

    const flight = new Flight(
        {
            FlightNumber: flightNumber,
            DepartureTime: departureTime,
            ArrivalTime: arrivalTime,
            EconomySeatsNumber: economySeatsNumber,
            BuisnessSeatsNumber: buisnessSeatsNumber,
            DeparturePort: departurePort,
            ArrivalPort: arrivalPort
        }
    );
    console.log(flight);
    flight.save().then(() => console.log("success")).catch((err) => console.log(err));

}

const getFlight = (req, res) => {
    const body = req.body;
    const reqKeys = Object.keys(body);
    console.log(body);

    if (Object.keys(body).length === 0) {
        console.log("empty");
        res.send("");
        res.end();
        return;
    }

    Flight.find(body).then((result) => {
        console.log(result);
        res.send(result);
    }).catch(err => console.log(err));

}

const listAllFlights = (req, res) => {
    const body = req.body;
    Flight.find().then((result) => {
        console.log(result);
        res.send(result);
    })
};

const updateFLight = (req, res) => {

}

module.exports =
{
    addFlight,
    getFlight,
    listAllFlights
}