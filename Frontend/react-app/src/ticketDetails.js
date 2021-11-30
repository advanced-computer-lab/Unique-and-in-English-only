import React from "react";
import axios from 'axios'
import ListFlights from "./listFlights";
import Button from '@mui/material/Button';



function FlightDetails(props) {
  
const deleteHelper= async(flightObj) =>{
  props.deleteHandler(flightObj)
}

  return (
    <div className="main">
           <h2>Flight Number: {props.f.OutgoingFlightNumber}</h2>
      <div className="">
          <p> From: {props.f.OutgoingFlightDepartureAirport} </p><p>To: {props.f.OutgoingFlightArrivalAirport} </p>
          <br />
          <p>Departure Date:{props.f.OutgoingFlightDepartureDate} </p><p>Arrival Date:{props.f.OutgoingFlightArrivalDate} </p>
          <br />
          <p>Chosen Cabin:{props.f.Cabin} </p><p>Chosen Seats:{props.f.OutgoingChosenSeats} </p>
      </div>
      <div className="">
          <p> From: {props.f.OutgoingFlightArrivalAirport} </p><p>To: {props.f.OutgoingFlightDepartureAirport} </p>
          <br />
          <p>Departure Date:{props.f.ReturnFlightDepartureDate} </p><p>Arrival Date:{props.f.ReturnFlightArrivalDate} </p>
          <br />
          <p>Chosen Cabin:{props.f.Cabin} </p><p>Chosen Seats:{props.f.ReturnChosenSeats} </p>
          <br />
          <p>Total Price:{props.f.TotalPrice} </p>
      </div>
      <div className="">
          <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'25%',float:"Right"}}>Delete</Button>
    </div>
    </div>
  );
}

export default FlightDetails;