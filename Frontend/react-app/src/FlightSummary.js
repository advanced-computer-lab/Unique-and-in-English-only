import React from "react";
import "./FlightDetails.css";
import axios from 'axios'
import ListFlights from "./listFlights";
import Button from '@mui/material/Button';

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US");
}

function FlightSummary(props) {

  var price = 0;


  console.log(props.cabin);
  if (props.cabin == "Business") {
    price = props.f.BusinessPrice;
    console.log("props. f  sfdf ");
  }
  else {
    price = props.f.EconomyPrice;
    console.log(price);
  }

  const totalFlightPrice = price * parseInt(props.adults) + price * parseInt(props.children) * 0.5;
  const flightPrice = props.price;




  return (


      <div>
            <hr />
            <h3>Flight Number: {props.f.FlightNumber}</h3>
            <h3>From: {props.f.DeparturePort}</h3>
            <h3>To: {props.f.ArrivalPort}</h3>
            <h4>Departure Time: {formatDate(props.f.DepartureTime)}</h4>
            <h4>Arrival Time: {formatDate(props.f.ArrivalTime)}</h4>
            <h4>Cabin: {props.cabin}</h4>
            <h4>Price: {flightPrice}</h4>
            <h4>Arrival Port: {props.f.ArrivalPort}</h4>
      </div>

  );
}

export default FlightSummary;