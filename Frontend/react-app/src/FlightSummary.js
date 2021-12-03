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
            <hr/>
            <h3>Flight Number: {props.f.FlightNumber}</h3>
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
            <h4>Arrival Time: {props.f.ArrivalTime}</h4>
          </div>
          <div id="row3">
            <h4>Departure Port: {props.f.DeparturePort}</h4>
            <h4>Arrival Port: {props.f.ArrivalPort}</h4>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightSummary;