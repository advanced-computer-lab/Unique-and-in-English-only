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
            EconomySeats: economySeats
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
    const output = `<p> your flight number is : ${flightNumber}`;
    const transporter = nodemailer.createTransport(
        {
            service: "hotmail",
            auth: {
                user: "aclacl_14787@outlook.com",
                pass: "nodemailer@14787"
            }
        }
    );
    const options = {
        from: "aclacl_14787@outlook.com",
        to: "as@gmail.com",
        subject: "Node mailer test",
        text: "woooow",
        html: output
    }
    transporter.sendMail(options, function (err, info) {
        if (err) {
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

    Flight.findById(sessions.userId).then((result) => {
        
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
    var seats = "EconomySeatsNumber";

    if (cabin == "Buisness") {
        seats = "BuisnessSeatsNumber";
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
   
    reserveSeatsinFlight(outgoingFlight, ticket.outgoingSeats, sessions.cabin)
    reserveSeatsinFlight(returnFlight, ticket.returnSeats, sessions.cabin)


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


    User.findById("61a7e41644e96c67df866cdd").then((result) => {
        result.Tickets.push(ticket);
        result.save().then((res) => {
            ;
        });
    });




}
function reserveSeatsinFlight(flight, seatsSelected, cabin) {
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
                seats[i].isReserved = true;
            }
        };
    };


}

const listReservations = (req, res) => {
    const body = req.body;
    User.findById("61a7e41644e96c67df866cdd").then((result) => {
       
        sessions.tickets = result.Tickets;
        res.send(result.Tickets);
    })
};
const deleteTicket = (req, res) => {
    const deletedTicket = req.body
    if (!deletedTicket) {
        return res.status(400).send({ message: "data to update can not be empty " });
    }
   
    const newTickets = removeObjectFromArray(sessions.tickets, deletedTicket);
    console.log(newTickets);
    sessions.tickets = newTickets;
    const bunchOfTickets = { Tickets: newTickets };
    User.findByIdAndUpdate("61a7e41644e96c67df866cdd", bunchOfTickets, { useFindAndModify: false })
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
            return ele.outgoingFlight._id != flightObj.outgoingFlight._id | ele.returnFlight._id!= flightObj.returnFlight._id|!checkSeats(ele.outgoingSeats,flightObj.outgoingSeats)|!checkSeats(ele.returnSeats,flightObj.returnSeats);
        });
    }

}
 function checkSeats (seats1,seats2){
  for(let i=0;i<seats1.length;i++){
      if(seats1[i].number!=seats2[i].number)
      return false
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
    Flight.findByIdAndUpdate(sessions.userId, body, { useFindAndModify: false })
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
    getCabin
}
