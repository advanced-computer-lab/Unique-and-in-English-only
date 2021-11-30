const Flight = require("../Models/Flight");
const nodemailer=require('nodemailer');


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
            DepartureTerminal: DepartureTerminal
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
        const output =`<p> your flight number is : ${flightNumber}`;
        const transporter =nodemailer.createTransport(
            {
                service:"hotmail",
                auth:{
                    user:"aclacl_14787@outlook.com",
                    pass:"nodemailer@14787"
                }
            }
        );
        const options={
            from:"aclacl_14787@outlook.com",
            to:"mohamedelshaarawy87@gmail.com",
            subject:"Node mailer test",
            text:"woooow",
            html:output
        }
        transporter.sendMail(options, function(err,info){
            if(err){
                console.log(err);
                return;
            }
            console.log(info.response);
        })

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

module.exports =
{
    addFlight,
    getFlight,
    listAllFlights,
    updateFLight,
    deleteFlight
}