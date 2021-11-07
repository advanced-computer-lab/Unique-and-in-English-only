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
    res.send("succes");

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
    if (!req.body) {
        return res.status(400).send({ message: "data to update can not be empty " });
    }
    const reqKeys = Object.keys(req.body);
    removeEmptyAttributes(reqKeys, req.body)
    const id = req.params.id;
    Flight.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

module.exports =
{
    addFlight,
    getFlight,
    listAllFlights,
    updateFLight,
    deleteFlight
}