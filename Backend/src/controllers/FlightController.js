const Flight = require("../Models/Flight");
const sessions = require('express-session');

const addFlight = (req, res) => {
    const flightNumber = req.body.FlightNumber;
    const departureTime = req.body.DepartureTime;
    const arrivalTime = req.body.ArrivalTime;
    const economySeatsNumber = req.body.EconomySeatsNumber;
    const buisnessSeatsNumber = req.body.BuisnessSeatsNumber;
    const departurePort = req.body.DeparturePort;
    const arrivalPort = req.body.ArrivalPort;
    const arrivalTerminal = req.body.ArrivalTerminal;
    const DepartureTerminal = req.body.DepartureTerminal;

    const buisnessSeats = new Array();
    const economySeats = new Array();
    for (var index = 0; index < buisnessSeatsNumber; index++) {
        buisnessSeats.push(false);
    }

    for (var index = 0; index < economySeatsNumber; index++) {
        economySeats.push(false);
    }


    const flight = new Flight(
        {
            FlightNumber: flightNumber,
            DepartureTime: departureTime,
            ArrivalTime: arrivalTime,
            EconomySeatsNumber: economySeatsNumber,
            BuisnessSeatsNumber: buisnessSeatsNumber,
            DeparturePort: departurePort,
            ArrivalPort: arrivalPort,
            ArrivalTerminal: arrivalTerminal,
            DepartureTerminal: DepartureTerminal,
            BuisnessSeats: buisnessSeats,
            EconomySeats: economySeats
        }
    );
    console.log(flight);
    flight.save()
        .then(() => {
            console.log("success");
            res.status(200).send("success");
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send("error")
        });


}

const getFlight = (req, res) => {
    const body = req.body;
    const reqKeys = Object.keys(body);
    removeEmptyAttributes(reqKeys, body);

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
    const body = req.body
    if (!body) {
        return res.status(400).send({ message: "data to update can not be empty " });
    }
    const reqKeys = Object.keys(body);
    removeEmptyAttributes(reqKeys, body)
    const id = req.params.id;
    Flight.findByIdAndUpdate(id, body, { useFindAndModify: false })
        .then(data => { 
            if (!data) {
                res.status(404).send({ message: " update can not be empty " })
            } else {
                res.send(data);
            }
        }

        ).catch(err => {
            res.status(500).send({ message: " update can not be done " });

        })


}
const deleteFlight = (req, res) => {
    const id = req.params.id;
    Flight.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: " delete can not be done " })
            } else {
                res.send({ message: "user was deleted succesfully" });
            }
        }

        ).catch(err => {
            res.status(500).send({ message: " delete can not be done " + id });

        })

}

function removeEmptyAttributes(reqKeys, body) {
    reqKeys.forEach(
        function (attribute) {
            if (body[attribute] == "")
                delete body[attribute];
        }
    );
}


function searchFlightPassenger(req, res) {
    const flight = req.body;
    console.log(flight);

    const adults = flight.adults;
    const children = flight.children;

    if (flight.adults < 1) {
        //Error
        return;
    }
    if (flight.children == '') {
        children = 0

    }
    const numPassengers = adults + children;
    console.log(numPassengers + 2);
    const outboundDate = new Date(flight.outboundDate);
    const returnDate = new Date(flight.returnDate);
    const departurePort = flight.flyingFrom.airportName;
    const arrivalPort = flight.flyingTo.airportName;
    const cabin = flight.cabin;
    const seats = "EconomySeatsNumber";

    if (cabin == "Buisness") {
        seats = "BuisnessSeatsNumber";
    }

    console.log(outboundDate);
    outgoingFlight = {
        DeparturePort: departurePort,
        ArrivalPort: arrivalPort,
        DepartureTime: outboundDate,

    }

    Flight.find(outgoingFlight).where(`${seats}`).gt(numPassengers).then((result) => {
        // console.log(result);
        sessions.searchResults=result;
        console.log(sessions.searchResults);
    }).catch(err => console.log(err));


}

const showFlights = (req, res) => {
    res.send(sessions.searchResults);
};

module.exports =
{
    addFlight,
    getFlight,
    listAllFlights,
    updateFLight,
    deleteFlight,
    searchFlightPassenger,
    showFlights
}