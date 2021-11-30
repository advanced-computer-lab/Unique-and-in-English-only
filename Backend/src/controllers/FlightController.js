const Flight = require("../Models/Flight");
const nodemailer=require('nodemailer');

const sessions = require('express-session');
const User = require("../models/User");

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
const getFlightById = (req, res) => {
    const id = req.params.id;
    Flight.findById(id).then((result) => {
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
    returnFlight={
        DeparturePort: arrivalPort,
        ArrivalPort: departurePort,
        DepartureTime: returnDate,
    }
    sessions.outgoingFlight=outgoingFlight;
    sessions.seats=seats;
    sessions.numPassengers=numPassengers;
    sessions.returnFlight=returnFlight;
    // Flight.find(outgoingFlight).where(`${seats}`).gt(numPassengers).then((result) => {
    //     // console.log(result);
    //     sessions.searchResults=result;
    //     console.log(sessions.searchResults);
    // }).catch(err => console.log(err));


}

const showFlights = (req, res) => {
    seats=sessions.seats;
    outgoingFlight=sessions.outgoingFlight;
    numPassengers=sessions.numPassengers;
    Flight.find(outgoingFlight).where(`${seats}`).gt(numPassengers).then((result) => {
         console.log(result);
        res.send(result);
    }).catch(err => console.log(err));
};
const showReturnFlights = (req, res) => {
    seats=sessions.seats;
    returnFlight=sessions.returnFlight;
    numPassengers=sessions.numPassengers;
    Flight.find(returnFlight).where(`${seats}`).gt(numPassengers).then((result) => {
        // console.log(result);
        res.send(result);
    }).catch(err => console.log(err));
};
const setFlightId = (req, res) => {
     sessions.flightId = req.params.id;
     const body = req.body;
     sessions.outgoingFlightObject =body;


}
const setReturnFlightId = (req, res) => {
    sessions.ReturnFlightId = req.params.id;
    const body = req.body;
    sessions.returnFlightObject =body;

}
const getOutgoingFlight=(req,res)=>{
    res.send(sessions.outgoingFlightObject)
}
const getReturnFlight=(req,res)=>{
    res.send(sessions.returnFlightObject)
}

const listReservations = (req, res) => {
    const body = req.body;
    User.findById(sessions.userId).then((result) => {
        console.log(result);
        sessions.tickets=result.Tickets;
        res.send(result.Tickets);
    })
};
const deleteTicket = (req, res) => {
    const deletedTicket = req.body
    if (!deletedTicket) {
        return res.status(400).send({ message: "data to update can not be empty " });
    }
   const newTickets=removeObjectFromArray(sessions.tickets,deleteTicket);
   sessions.tickets=newTickets;
    const id = sessions.userId;
    const bunchOfTickets ={Tickets:newTickets};
    Flight.findByIdAndUpdate(id, bunchOfTickets, { useFindAndModify: false })
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


        function removeObjectFromArray(flight, flightObj) {

            return flight.filter(function (ele) {
              return ele != flightObj;
            });
        }

}

module.exports =
{
    addFlight,
    getFlight,
    listAllFlights,
    updateFLight,
    deleteFlight,
    searchFlightPassenger,
    showFlights,
    setFlightId,
    showReturnFlights,
    setReturnFlightId,
    getFlightById,
    getOutgoingFlight,
    getReturnFlight,
    listReservations,
    deleteTicket
}
