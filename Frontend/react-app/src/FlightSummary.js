import React from "react";
import "./FlightDetails.css";
import axios from 'axios'
import ListFlights from "./listFlights";
import Button from '@mui/material/Button';



function FlightSummary(props) {

  return (
    <div className="">

      <div className="details-container">
        <div className="details-row">
          <div id="row1">
            <h2>Flight Number: {props.f.FlightNumber}</h2>
          </div>
        </div>
        <div className="details-row">
          <div id="row2">
            <h3>From: {props.f.DeparturePort}</h3>
            <h3>To: {props.f.ArrivalPort}</h3>
          </div>
        </div>
        <div className="details-row">
          <div id="row3">
            <h4>Departure Time: {props.f.DepartureTime}</h4>
            <h5>Arrival Time: {props.f.ArrivalTime}</h5>
          </div>
          <div id="row3">
            <h4>Departure Port: {props.f.DeparturePort}</h4>
            <h5>Arrival Port: {props.f.ArrivalPort}</h5>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default FlightSummary;