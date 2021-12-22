const Flight = require("../Models/Flight");
const nodemailer = require('nodemailer');

const sessions = require('express-session');
const { mongo } = require("mongoose");
const User = require("../Models/User");

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
    const TripDuration = req.body.TripDuration;
    const BaggageAllowance = req.body.BaggageAllowance;
    const BusinessPrice = req.body.BusinessPrice;
    const EconomyPrice = req.body.EconomyPrice;
    const buisnessSeats = new Array();
    const economySeats = new Array();
    for (var index = 0; index < buisnessSeatsNumber; index++) {
        const seat = { isSelected: false, number: index + 1, id: index + 1 }
        buisnessSeats.push(seat);
    }

    for (var index = 0; index < economySeatsNumber; index++) {
        const seat = { isSelected: false, number: index + 1, id: index + 1 }
        economySeats.push(seat);
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
            EconomySeats: economySeats,
            TripDuration: TripDuration,
            BaggageAllowance: BaggageAllowance,
            AvailableEconomySeatsNumber: economySeatsNumber,
            AvailableBuisnessSeatsNumber: buisnessSeatsNumber,
            BusinessPrice: BusinessPrice,
            EconomyPrice: EconomyPrice,

        }
    );
    flight.save()
        .then(() => {
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
        res.send("");
        res.end();
        return;
    }


    Flight.find(body).then((result) => {
        res.send(result);
    }).catch(err => console.log(err));

}
const getFlightById = (req, res) => {
    const id = req.params.id;
    Flight.findById(id).then((result) => {
        res.send(result);
    }).catch(err => console.log(err));

}

const getUserById = (req, res) => {

    User.findById("61b619887e7183c56adc6b99").then((result) => {

        res.send(result);
    }).catch(err => console.log(err));

}

const listAllFlights = (req, res) => {
    const body = req.body;
    Flight.find().then((result) => {
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
    if (!flight)
        return;

    const adults = parseInt(flight.adults);
    var children = parseInt(flight.children);

    if (adults < 1) {
        //Error
        return;
    }
    if (!children) {
        children = 0

    }
    const numPassengers = adults + children;
    const outboundDate = new Date(flight.outboundDate);
    const returnDate = new Date(flight.returnDate);
    const departurePort = flight.flyingFrom.airportName;
    const arrivalPort = flight.flyingTo.airportName;
    const cabin = flight.cabin;
    var seats = "AvailableEconomySeatsNumber";

    if (cabin == "Buisness") {
        seats = "AvailableBuisnessSeatsNumber";
    }

    outgoingFlight = {
        DeparturePort: departurePort,
        ArrivalPort: arrivalPort,
        DepartureTime: outboundDate,

    }
    returnFlight = {
        DeparturePort: arrivalPort,
        ArrivalPort: departurePort,
        DepartureTime: returnDate,
    }


    sessions.outgoingFlightSearch = outgoingFlight;
    sessions.seats = seats;
    sessions.numPassengers = numPassengers;
    sessions.returnFlightSearch = returnFlight;
    sessions.cabin = cabin;
    sessions.adults = adults;
    console.log(adults);
    sessions.children = children;
    // Flight.find(outgoingFlight).where(`${seats}`).gt(numPassengers).then((result) => {
    //     // console.log(result);
    //     sessions.searchResults=result;
    //     console.log(sessions.searchResults);
    // }).catch(err => console.log(err));

    //  const user = new User({
    //     FirstName: "Men3am",
    //     LastName: "ElDardey",
    //     Tickets: []
    // })

    // user.save().then((res) => {

    // }).catch(err => console.log(""));

}

const showFlights = (req, res) => {
    seats = sessions.seats;
    outgoingFlightSearch = sessions.outgoingFlightSearch;
    numPassengers = sessions.numPassengers;
    if (!outgoingFlightSearch)
        return;
    Flight.find(outgoingFlightSearch).where(`${seats}`).gt(numPassengers).then((result) => {
        console.log(result);
        res.send(result);
    }).catch(err => console.log(err));
};

const showReturnFlights = (req, res) => {
    seats = sessions.seats;
    returnFlightSearch = sessions.returnFlightSearch;
    numPassengers = sessions.numPassengers;
    Flight.find(returnFlightSearch).where(`${seats}`).gt(numPassengers).then((result) => {
        res.send(result);
    }).catch(err => console.log(err));
};
const setFlightId = (req, res) => {
    const body = req.body;
    sessions.outgoingFlightSelected = body;


}
const setReturnFlightId = (req, res) => {
    const body = req.body;
    sessions.returnFlightSelected = body;

}
const getOutgoingFlight = (req, res) => {
    res.send(sessions.outgoingFlightSelected)
}

const getCabin = (req, res) => {
    res.send(sessions.cabin)
}
const getReturnFlight = (req, res) => {
    res.send(sessions.returnFlightSelected)
}

const getChildren = (req, res) => {
    res.send({ children: sessions.children });
}

const getAdults = (req, res) => {
    res.send({ adults: sessions.adults });
}

const getReservationDetails = (req, res) => {

    const reservationsDetails = {};
    reservationsDetails.outgoingFlightSelected = sessions.outgoingFlightSelected;
    reservationsDetails.returnFlightSelected = sessions.returnFlightSelected;
    reservationsDetails.children = sessions.children;
    reservationsDetails.adults = sessions.adults;
    reservationsDetails.cabin = sessions.cabin;



    res.send(reservationsDetails)

}

const setSelectedOutgoingSeats = (req, res) => {
    sessions.selectedOutgoingSeats = req.body;
    res.send();
}

const setSelectedReturnSeats = (req, res) => {
    sessions.selectedReturnSeats = req.body;
    res.send();
}
const getSelectedOutgoingSeats = (req, res) => {

    res.send(sessions.selectedOutgoingSeats);
}

const getSelectedReturnSeats = (req, res) => {

    res.send(sessions.selectedReturnSeats);
}
const confirmTicket = (req, res) => {
    sessions.ticket = req.body;
    const ticket = req.body;
    const outgoingFlight = ticket.outgoingFlight;
    const returnFlight = ticket.returnFlight
    // console.log(ticket);

    reserveSeatsinFlight(outgoingFlight, ticket.outgoingSeats, ticket.cabin)
    reserveSeatsinFlight(returnFlight, ticket.returnSeats, ticket.cabin)
    if (sessions.cabin == 'Buisness') {
        outgoingFlight.AvailableBuisnessSeatsNumber -= ticket.returnSeats.length;
        returnFlight.AvailableBuisnessSeatsNumber -= ticket.returnSeats.length;

    } else {
        outgoingFlight.AvailableEconomySeatsNumber -= ticket.returnSeats.length;
        returnFlight.AvailableEconomySeatsNumber -= ticket.returnSeats.length;

    }


    Flight.findByIdAndUpdate(outgoingFlight._id, outgoingFlight)
        .then((result) => {
            console.log("updated")
        }).catch(err => console.log(err));

    Flight.findByIdAndUpdate(returnFlight._id, returnFlight)
        .then((result) => {
            console.log("updated")
        }).catch(err => console.log(err));

    // const user = new User({
    //     FirstName: "Men3am",
    //     LastName: "ElDardey",
    //     Tickets: []
    // })

    // user.save().then((res) => {

    // }).catch(err => console.log(""));


    User.findById("61b619887e7183c56adc6b99").then((result) => {
        console.log(result.Tickets);
        result.Tickets.push(ticket);
        console.log(result.Tickets);
        result.save().then((res) => {
            console.log("tickets updated");
        });
    });




}

function reserveSeatsinFlight(flight, seatsSelected, cabin) {
    changeSeatsReservationinFlight(flight, seatsSelected, cabin, true);
}

function unreserveSeatsinFlight(flight, seatsSelected, cabin) {
    changeSeatsReservationinFlight(flight, seatsSelected, cabin, false);
}

function changeSeatsReservationinFlight(flight, seatsSelected, cabin, changeTo) {
    var seats = [];
    if (cabin == "Buisness") {
        seats = flight.BuisnessSeats;
    }
    else {
        seats = flight.EconomySeats;
    }




    for (var i = 0; i < seats.length; i++) {
        for (var j = 0; j < seatsSelected.length; j++) {
            if (seats[i].number == seatsSelected[j].number) {
                seats[i].isReserved = changeTo;
            }
        };
    };


}

const listReservations = (req, res) => {
    const body = req.body;
    User.findById("61b619887e7183c56adc6b99").then((result) => {

        sessions.tickets = result.Tickets;
        res.send(result.Tickets);
    })
};
const deleteTicket = (req, res) => {
    const deletedTicket = req.body
    const PR = deletedTicket.TicketTotalPrice;
    if (!deletedTicket) {
        return res.status(400).send({ message: "data to update can not be empty " });
    }

    const cabin = deletedTicket.cabin;
    const outgoingSeats = deletedTicket.outgoingSeats;
    const returnSeats = deletedTicket.returnSeats;
    const outgoingFlight = deletedTicket.outgoingFlight;
    const returnFlight = deletedTicket.returnFlight;
    unreserveSeatsinFlight(outgoingFlight, outgoingSeats, cabin);
    unreserveSeatsinFlight(returnFlight, returnSeats, cabin);
    if (cabin == 'Buisness') {
        outgoingFlight.AvailableBuisnessSeatsNumber += returnSeats.length;
        returnFlight.AvailableBuisnessSeatsNumber += returnSeats.length;

    } else {
        outgoingFlight.AvailableEconomySeatsNumber += returnSeats.length;
        returnFlight.AvailableEconomySeatsNumber += returnSeats.length;

    }
    console.log("jngfdljnjklngdfjln ");
    console.log(outgoingSeats);
    console.log(outgoingFlight);
    console.log(cabin);


    Flight.findByIdAndUpdate(outgoingFlight._id, outgoingFlight).then(result => { console.log("updated fgfd") });
    Flight.findByIdAndUpdate(returnFlight._id, returnFlight).then((result) => { console.log("updated return") });


    const newTickets = removeObjectFromArray(sessions.tickets, deletedTicket);
    sessions.tickets = newTickets;
    const bunchOfTickets = { Tickets: newTickets };



    User.findByIdAndUpdate("61b619887e7183c56adc6b99", bunchOfTickets, { useFindAndModify: false })
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

    const output = `We want to inform you that you have cancelled your flight and your refunded amount is ${PR} `;
    const transporter = nodemailer.createTransport(
        {
            service: "hotmail",
            auth: {
                user: "aclacl_2000@outlook.com",
                pass: "nodemailer@2000"
            }
        }
    );
    const options = {
        from: "aclacl_2000@outlook.com",
        to: "faroukamr508@gmail.com",
        subject: "Node mailer test",
        text: "Unique airlines",
        html: output
    }

    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(info.response);
    })



    function removeObjectFromArray(flight, flightObj) {

        return flight.filter(function (ele) {
            return ele.outgoingFlight._id != flightObj.outgoingFlight._id | ele.returnFlight._id != flightObj.returnFlight._id;
        });
    }

}


function checkSeats(seats1, seats2) {
    if (seats1.length >= seats2.length) {
        for (let i = 0; i < seats1.length; i++) {
            if (seats1[i].number != seats2[i].number)
                return false
        }
    }

    if (seats1.length < seats2.length) {
        for (let i = 0; i < seats2.length; i++) {
            if (seats1[i].number != seats2[i].number)
                return false
        }
    }
    return true


}

const updateUser = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).send({ message: "data to update can not be empty " });
    }
    const reqKeys = Object.keys(body);
    removeEmptyAttributes(reqKeys, body)
    const id = req.params.id;
    User.findByIdAndUpdate("61b619887e7183c56adc6b99", body, { useFindAndModify: false })
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
    getReservationDetails,
    setSelectedOutgoingSeats,
    setSelectedReturnSeats,
    getSelectedOutgoingSeats,
    getSelectedReturnSeats,
    confirmTicket,
    listReservations,
    deleteTicket,
    updateUser,
    getUserById,
    getChildren,
    getAdults,
    getCabin
}
