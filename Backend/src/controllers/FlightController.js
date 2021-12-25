const Flight = require("../Models/Flight");
const nodemailer = require('nodemailer');

const sessions = require('express-session');
const { mongo } = require("mongoose");
const User = require("../Models/User");
const userController = require("./UserController")
const verifyUserToken = userController.verifyUserToken;
var today = new Date();
var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

const addFlight = async (req, res) => {


  const authObject = verifyUserToken(req);

  console.log(authObject);

  if (authObject.admin != true) {
    console.log("reject")
    return;
  }

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

  const authObject = verifyUserToken(req);
  if (authObject.role == "viewer") {
    return;
  }
  const userID = authObject._id;


  User.findById(userID).then((result) => {

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
  //     Tickets: [],
  //     PassportNumber:"46589",

  //     Password:"lolo123",

  // })

  // user.save().then((res) => {

  // }).catch(err => console.log("saved"));

}

const showFlights = (req, res) => {
  seats = sessions.seats;
  outgoingFlightSearch = sessions.outgoingFlightSearch;
  numPassengers = sessions.numPassengers;
  if (!outgoingFlightSearch)
    return;
  Flight.find(outgoingFlightSearch).where(`${seats}`).gt(numPassengers).then((result) => {

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
function looper(seats) {
  var result = [];
  for (let index = 0; index < seats.length; index++) {
    const element = seats[index];


    result.push("(" + element.number + ")")
  }
  return result;
}
const confirmTicket = (req, res) => {

  const authObject = verifyUserToken(req);
  if (authObject.role == "viewer") {
    return;
  }

  console.log("came here");
  const userID = authObject._id;
  const email = authObject.email;
  sessions.ticket = req.body;
  const ticket = req.body;
  const outgoingFlight = ticket.outgoingFlight;
  const returnFlight = ticket.returnFlight
  // console.log(ticket);
  const transporter2 = nodemailer.createTransport(
    {
      service: "hotmail",
      auth: {
        user: "aclacl_2020@outlook.com",
        pass: "nodemailer@2020"
      }
    }
  );


  const outgoingSeatsPrint = looper(ticket.outgoingSeats);
  const returnSeatsPrint = looper(ticket.returnSeats);
  console.log(outgoingSeatsPrint);
  const output2 = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title></title>
    
      <style type="text/css">
        table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; }
  @media only screen and (min-width: 520px) {
    .u-row {
      width: 500px !important;
    }
    .u-row .u-col {
      vertical-align: top;
    }
  
    .u-row .u-col-100 {
      width: 500px !important;
    }
  
  }
  
  @media (max-width: 520px) {
    .u-row-container {
      max-width: 100% !important;
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
    .u-row .u-col {
      min-width: 320px !important;
      max-width: 100% !important;
      display: block !important;
    }
    .u-row {
      width: calc(100% - 40px) !important;
    }
    .u-col {
      width: 100% !important;
    }
    .u-col > div {
      margin: 0 auto;
    }
  }
  body {
    margin: 0;
    padding: 0;
  }
  
  table,
  tr,
  td {
    vertical-align: top;
    border-collapse: collapse;
  }
  
  p {
    margin: 0;
  }
  
  .ie-container table,
  .mso-container table {
    table-layout: fixed;
  }
  
  * {
    line-height: inherit;
  }
  
  a[x-apple-data-detectors='true'] {
    color: inherit !important;
    text-decoration: none !important;
  }
  
  </style>
    
    
  
  </head>
  
  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
    <tr style="vertical-align: top">
      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
      
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #ffffff;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
    <div style="background-color: #ffffff;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          
    <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%; text-align: right;">${date}</p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ecf0f1;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: #ecf0f1;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #ffffff;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
    <div style="background-color: #ffffff;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding-right: 0px;padding-left: 0px;" align="center">
        
        <img align="center" border="0" src="cid:logo" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 180px;" width="180"/>
        
      </td>
    </tr>
  </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #1c4079;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
    <div style="background-color: #1c4079;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding-right: 0px;padding-left: 0px;" align="center">
        
        <img align="center" border="0" src="cid:airPlane" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 480px;" width="480"/>
        
      </td>
    </tr>
  </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ecf0f1;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: #ecf0f1;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #1c4079;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
    <div style="background-color: #1c4079;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          
    <div style="color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-size: 22px; line-height: 30.8px;">Flight Reservation</span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #c2e0f4;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
    <div style="background-color: #c2e0f4;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          
    <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px; font-family: helvetica, sans-serif;">Dear Client,</span></p>
      <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">Here are your Reservation Details :-</span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">Departure Flight number:${ticket.outgoingFlight.FlightNumber}</span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">From:${ticket.outgoingFlight.DeparturePort} ----->${ticket.outgoingFlight.ArrivalPort}</span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">Departure Date : ${ticket.outgoingFlight.DepartureTime}     ,   Arrival Date:${ticket.outgoingFlight.ArrivalTime}</span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">Cabin: ${ticket.cabin}   ,    Seats:${outgoingSeatsPrint}</span></p>
  <br/>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">Return Flight number:${ticket.returnFlight.FlightNumber}</span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">From:${ticket.returnFlight.DeparturePort} ----->${ticket.returnFlight.ArrivalPort}</span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">Departure Date : ${ticket.returnFlight.DepartureTime}     ,   Arrival Date:${ticket.returnFlight.ArrivalTime}</span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">Cabin: ${ticket.cabin}   ,    Seats:${returnSeatsPrint}</span></p>
  
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #c2e0f4;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
    <div style="background-color: #c2e0f4;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          
  <div align="center">
    <div style="display: table; max-width:110px;">
    <!--[if (mso)|(IE)]><table width="110" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:110px;"><tr><![endif]-->
    
      
      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
        <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <a href="https://facebook.com/" title="Facebook" target="_blank">
            <img src="cid:facebook" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
          </a>
        </td></tr>
      </tbody></table>
      <!--[if (mso)|(IE)]></td><![endif]-->
      
      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
        <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <a href="https://instagram.com/" title="Instagram" target="_blank">
            <img src="cid:instagram" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
          </a>
        </td></tr>
      </tbody></table>
      <!--[if (mso)|(IE)]></td><![endif]-->
      
      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
        <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <a href="https://twitter.com/" title="Twitter" target="_blank">
            <img src="cid:twitter" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
          </a>
        </td></tr>
      </tbody></table>
      <!--[if (mso)|(IE)]></td><![endif]-->
      
      
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
    </tr>
    </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
  
  </html>
  `;

  const options2 = {
    from: "aclacl_2020@outlook.com",
    to: email,
    subject: "Node mailer test",
    text: "Unique airlines",
    html: output2,
    attachments: [{
      filename: 'image.png',
      path: __dirname + "/airplane.jpeg",
      cid: "airPlane" //same cid value as in the html img src
    },
    {
      filename: 'image.png',
      path: __dirname + "/Logo.jpeg",
      cid: "logo" //same cid value as in the html img src
    },
    {
      filename: 'image.png',
      path: __dirname + "/facebook.png",
      cid: "facebook" //same cid value as in the html img src
    },
    {
      filename: 'image.png',
      path: __dirname + "/instagram.png",
      cid: "instagram" //same cid value as in the html img src
    },
    {
      filename: 'image.png',
      path: __dirname + "/twitter.png",
      cid: "twitter" //same cid value as in the html img src
    }

    ]
  }


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


  // User.findById(userID).then((result) => {
  //   console.log("found user and will update tickets");
  //   console.log(result);
  //   console.log(result.Tickets);
  //   result.Tickets.push(ticket);
  //   result.FirstName = "Mohamed";
  //   console.log(result.Tickets);
  //   console.log(userID);
  //   result.save().then((res) => {
  //     console.log("tickets updated");
  //   });
  // });

  User.findByIdAndUpdate(userID, { '$push': { "Tickets": ticket } })
    .then((result) => {
      console.log("Tickets updated")
    })

  transporter2.sendMail(options2, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(info.response);
  })




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
  const authObject = verifyUserToken(req);
  console.log("came to reservation");
  console.log(authObject);

  if (authObject.role == "viewer") {
    return;
  }
  const userID = authObject._id;
  User.findById(userID).then((result) => {

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
  const authObject = verifyUserToken(req);
  if (authObject.role == "viewer") {
    return;
  }
  const userID = authObject._id;
  const email = authObject.email;
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



  User.findByIdAndUpdate(userID, bunchOfTickets, { useFindAndModify: false })
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

  const output = `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      <title></title>
      
        <style type="text/css">
          table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; }
    @media only screen and (min-width: 520px) {
      .u-row {
        width: 500px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }
    
      .u-row .u-col-100 {
        width: 500px !important;
      }
    
    }
    
    @media (max-width: 520px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: calc(100% - 40px) !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    
    p {
      margin: 0;
    }
    
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    
    * {
      line-height: inherit;
    }
    
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    
    </style>
      
      
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
        
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #ffffff;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
      <div style="background-color: #ffffff;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%; text-align: right;">${date}</p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ecf0f1;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: #ecf0f1;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #ffffff;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
      <div style="background-color: #ffffff;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="cid:logo" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 180px;" width="180"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #1c4079;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
      <div style="background-color: #1c4079;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="cid:airPlane" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 480px;" width="480"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ecf0f1;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: #ecf0f1;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #1c4079;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
      <div style="background-color: #1c4079;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-size: 22px; line-height: 30.8px;">Flight cancellation</span></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #c2e0f4;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
      <div style="background-color: #c2e0f4;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px; font-family: helvetica, sans-serif;">Dear hhoij,</span></p>
    <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">This email is to inform you that you cancelled your Flight and the amount refunded is ${PR}</span></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #c2e0f4;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
      <div style="background-color: #c2e0f4;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <div align="center">
      <div style="display: table; max-width:110px;">
      <!--[if (mso)|(IE)]><table width="110" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:110px;"><tr><![endif]-->
      
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://facebook.com/" title="Facebook" target="_blank">
              <img src="cid:facebook" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://instagram.com/" title="Instagram" target="_blank">
              <img src="cid:instagram" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://twitter.com/" title="Twitter" target="_blank">
              <img src="cid:twitter" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
      </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    
    </html>
    `;
  const transporter = nodemailer.createTransport(
    {
      service: "hotmail",
      auth: {
        user: "aclacl_2020@outlook.com",
        pass: "nodemailer@2020"
      }
    }
  );
  const options = {
    from: "aclacl_2020@outlook.com",
    to: email,
    subject: "Node mailer test",
    text: "Unique airlines",
    html: output,
    attachments: [{
      filename: 'image.png',
      path: __dirname + "/airplane.jpeg",
      cid: "airPlane" //same cid value as in the html img src
    },
    {
      filename: 'image.png',
      path: __dirname + "/Logo.jpeg",
      cid: "logo" //same cid value as in the html img src
    },
    {
      filename: 'image.png',
      path: __dirname + "/facebook.png",
      cid: "facebook" //same cid value as in the html img src
    },
    {
      filename: 'image.png',
      path: __dirname + "/instagram.png",
      cid: "instagram" //same cid value as in the html img src
    },
    {
      filename: 'image.png',
      path: __dirname + "/twitter.png",
      cid: "twitter" //same cid value as in the html img src
    }

    ]
  }

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(info.response);
  })





}

function removeObjectFromArray(flight, flightObj) {

  return flight.filter(function (ele) {
    return ele.outgoingFlight._id != flightObj.outgoingFlight._id | ele.returnFlight._id != flightObj.returnFlight._id;
  });
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
  const authObject = verifyUserToken(req);
  if (authObject.role == "viewer") {
    return;
  }
  const userID = authObject._id;

  const reqKeys = Object.keys(body);
  removeEmptyAttributes(reqKeys, body)
  const id = req.params.id;
  User.findByIdAndUpdate(userID, body, { useFindAndModify: false })
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
const sendEmailOfFlight = (req, res) => {
  const f = req.body;
  console.log("send email");
  const printOutgoingSeats = looper(f.outgoingSeats);
  const printReturnSeats = looper(f.returnSeats);
  const authObject = verifyUserToken(req);
  if (authObject.role == "viewer") {
    return;
  }
  const email = authObject.email;
  output3 = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title></title>
    
      <style type="text/css">
        table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; }
  @media only screen and (min-width: 520px) {
    .u-row {
      width: 500px !important;
    }
    .u-row .u-col {
      vertical-align: top;
    }
  
    .u-row .u-col-100 {
      width: 500px !important;
    }
  
  }
  
  @media (max-width: 520px) {
    .u-row-container {
      max-width: 100% !important;
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
    .u-row .u-col {
      min-width: 320px !important;
      max-width: 100% !important;
      display: block !important;
    }
    .u-row {
      width: calc(100% - 40px) !important;
    }
    .u-col {
      width: 100% !important;
    }
    .u-col > div {
      margin: 0 auto;
    }
  }
  body {
    margin: 0;
    padding: 0;
  }
  
  table,
  tr,
  td {
    vertical-align: top;
    border-collapse: collapse;
  }
  
  p {
    margin: 0;
  }
  
  .ie-container table,
  .mso-container table {
    table-layout: fixed;
  }
  
  * {
    line-height: inherit;
  }
  
  a[x-apple-data-detectors='true'] {
    color: inherit !important;
    text-decoration: none !important;
  }
  
  </style>
    
    
  
  </head>
  
  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
    <tr style="vertical-align: top">
      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
      
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #ffffff;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
    <div style="background-color: #ffffff;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          
    <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%; text-align: right;">${date}</p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ecf0f1;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: #ecf0f1;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #ffffff;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
    <div style="background-color: #ffffff;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding-right: 0px;padding-left: 0px;" align="center">
        
        <img align="center" border="0" src="cid:logo" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 180px;" width="180"/>
        
      </td>
    </tr>
  </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #1c4079;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
    <div style="background-color: #1c4079;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding-right: 0px;padding-left: 0px;" align="center">
        
        <img align="center" border="0" src="cid:airPlane" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 480px;" width="480"/>
        
      </td>
    </tr>
  </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ecf0f1;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: #ecf0f1;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #1c4079;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
    <div style="background-color: #1c4079;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          
    <div style="color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-size: 22px; line-height: 30.8px;">Flight Details</span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #c2e0f4;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
    <div style="background-color: #c2e0f4;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          
    <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px; font-family: helvetica, sans-serif;">Dear Client,</span></p>
      <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">Here are your Flight Details :-</span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">Departure Flight number:${f.outgoingFlight.FlightNumber}</span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">From:${f.outgoingFlight.DeparturePort} ----->${f.outgoingFlight.ArrivalPort}</span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">Departure Date : ${f.outgoingFlight.DepartureTime}     ,   Arrival Date:${f.outgoingFlight.ArrivalTime}</span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">Cabin: ${f.cabin}   ,    Seats:${printOutgoingSeats}</span></p>
  <br/>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">Return Flight number:${f.returnFlight.FlightNumber}</span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">From:${f.returnFlight.DeparturePort} ----->${f.returnFlight.ArrivalPort}</span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">Departure Date : ${f.returnFlight.DepartureTime}     ,   Arrival Date:${f.returnFlight.ArrivalTime}</span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 16px; line-height: 22.4px;">Cabin: ${f.cabin}   ,    Seats:${printReturnSeats}</span></p>
  
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #c2e0f4;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
    <div style="background-color: #c2e0f4;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          
  <div align="center">
    <div style="display: table; max-width:110px;">
    <!--[if (mso)|(IE)]><table width="110" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:110px;"><tr><![endif]-->
    
      
      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
        <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <a href="https://facebook.com/" title="Facebook" target="_blank">
            <img src="cid:facebook" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
          </a>
        </td></tr>
      </tbody></table>
      <!--[if (mso)|(IE)]></td><![endif]-->
      
      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
        <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <a href="https://instagram.com/" title="Instagram" target="_blank">
            <img src="cid:instagram" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
          </a>
        </td></tr>
      </tbody></table>
      <!--[if (mso)|(IE)]></td><![endif]-->
      
      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
        <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <a href="https://twitter.com/" title="Twitter" target="_blank">
            <img src="cid:twitter" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
          </a>
        </td></tr>
      </tbody></table>
      <!--[if (mso)|(IE)]></td><![endif]-->
      
      
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
    </tr>
    </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
  
  </html>
  `;
  const transporter3 = nodemailer.createTransport(
    {
      service: "hotmail",
      auth: {
        user: "aclacl_2020@outlook.com",
        pass: "nodemailer@2020"
      }
    }
  );
  const options3 = {
    from: "aclacl_2020@outlook.com",
    to: email,
    subject: "Node mailer test",
    text: "Unique airlines",
    html: output3,
    attachments: [{
      filename: 'image.png',
      path: __dirname + "/airplane.jpeg",
      cid: "airPlane" //same cid value as in the html img src
    },
    {
      filename: 'image.png',
      path: __dirname + "/Logo.jpeg",
      cid: "logo" //same cid value as in the html img src
    },
    {
      filename: 'image.png',
      path: __dirname + "/facebook.png",
      cid: "facebook" //same cid value as in the html img src
    },
    {
      filename: 'image.png',
      path: __dirname + "/instagram.png",
      cid: "instagram" //same cid value as in the html img src
    },
    {
      filename: 'image.png',
      path: __dirname + "/twitter.png",
      cid: "twitter" //same cid value as in the html img src
    }

    ]
  }

  transporter3.sendMail(options3, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(info.response);
  });

}

const editReturnFlight = (req, res) => {
  sessions.ticketTobeEdited = req.body;
}
const listReturnFlights = (req, res) => {
  console.log(req.body)
  const date = new Date(req.body.returnDate)

  const cabinClass = req.body.cabin
  sessions.cabin = req.body.cabin;
  const oldFlight = sessions.ticketTobeEdited.returnFlight
  var seats = "AvailableEconomySeatsNumber"
  var numPassengers = sessions.ticketTobeEdited.returnSeats.length;
  if (cabinClass == "Buisness") {
    seats = "AvailableBuisnessSeatsNumber";
  }
  const searchCriteria = {
    DeparturePort: oldFlight.DeparturePort,
    ArrivalPort: oldFlight.ArrivalPort,
    DepartureTime: date,
  }

  Flight.find(searchCriteria).where(`${seats}`).gt(numPassengers).then((result) => {

    res.send(result);
  }).catch(err => console.log(err));
}

const selectEditedReturnFlight = (req, res) => {
  console.log(req.body);
  sessions.returnFlightSelected = req.body;
  sessions.adults = sessions.ticketTobeEdited.returnSeats.length;
  sessions.children = 0;
  sessions.outgoingFlightSelected = sessions.ticketTobeEdited.outgoingFlight;

}

const getOldTicketAndNewFlight = (req, res) => {
  const confirmationData = {
    oldTicket: sessions.ticketTobeEdited,
    newSeats: sessions.selectedReturnSeats,
    newFlight: sessions.returnFlightSelected,
    newCabin: sessions.cabin
  }
  res.send(confirmationData);

}

const editReturnFlightConfirmation = (req, res) => {
  const deletedTicket = req.body.deletedTicket;
  const PR = deletedTicket.TicketTotalPrice;
  if (!deletedTicket) {
    return res.status(400).send({ message: "data to update can not be empty " });
  }
  const authObject = verifyUserToken(req);
  if (authObject.role == "viewer") {
    return;
  }
  const userID = authObject._id;

  const cabin = deletedTicket.cabin;
  var outgoingSeats = deletedTicket.outgoingSeats;
  var returnSeats = deletedTicket.returnSeats;
  var outgoingFlight = deletedTicket.outgoingFlight;
  var returnFlight = deletedTicket.returnFlight;
  unreserveSeatsinFlight(outgoingFlight, outgoingSeats, cabin);
  unreserveSeatsinFlight(returnFlight, returnSeats, cabin);
  if (cabin == 'Buisness') {
    outgoingFlight.AvailableBuisnessSeatsNumber += returnSeats.length;
    returnFlight.AvailableBuisnessSeatsNumber += returnSeats.length;

  } else {
    outgoingFlight.AvailableEconomySeatsNumber += returnSeats.length;
    returnFlight.AvailableEconomySeatsNumber += returnSeats.length;

  }



  Flight.findByIdAndUpdate(outgoingFlight._id, outgoingFlight).then(result => { console.log("updated fgfd") });
  Flight.findByIdAndUpdate(returnFlight._id, returnFlight).then((result) => { console.log("updated return") });


  const newTickets = removeObjectFromArray(sessions.tickets, deletedTicket);
  sessions.tickets = newTickets;
  const bunchOfTickets = { Tickets: newTickets };



  User.findByIdAndUpdate(userID, bunchOfTickets, { useFindAndModify: false })
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

  const ticket = req.body.newTicket;
  outgoingFlight = ticket.outgoingFlight;
  returnFlight = ticket.returnFlight
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


  // User.findById(userID).then((result) => {
  //   console.log(result.Tickets);
  //   result.Tickets.push(ticket);
  //   console.log(result.Tickets);
  //   result.save().then((res) => {
  //     console.log("tickets updated");
  //   });
  // });
  // User.findByIdAndUpdate(userID, { "$push": { "Tickets": ticket })
  //   .then(result => {
  //     console.log("update successfully");
  //   })

  User.findByIdAndUpdate(userID, { '$push': { "Tickets": ticket } })
    .then((result) => {
      console.log("Tickets updated")
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
  getCabin,
  editReturnFlight,
  listReturnFlights,
  selectEditedReturnFlight,
  getOldTicketAndNewFlight,
  editReturnFlightConfirmation,
  sendEmailOfFlight
}