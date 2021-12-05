import React from "react";
import "./FlightDetails.css";
import axios from 'axios'
import ListFlights from "./listFlights";
import Button from '@mui/material/Button';
import "./flightSelectionCard.css"
import { useHistory } from "react-router-dom";


function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US");
}

function flightSelectionCard(props) {


  const submitHelper = async (flightObj) => {
    props.submitHandler(flightObj)
  }
  const updateHelper = async (flightObj) => {
    props.updateHandler(flightObj)
  }
  return (
    <div className="main">

      <div className="select-container">
        <div className="details-row">
          <div id="row1">
            <h2 className="colorBrown">Flight Number: {props.f.FlightNumber}</h2>
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
            <h2>baggageAllowance: {props.f.baggageAllowance} Kg</h2>
            <h2>price for adults: {props.f.price} USD</h2>
            <h2>price for children: {props.f.price * 0.5} USD</h2>
            <h2>Trip Duration: {props.f.TripDuration} </h2>
          </div>
        </div>



        <h4>Departure Time: {formatDate(props.f.DepartureTime)}</h4>
        <h4>Arrival Time: {formatDate(props.f.ArrivalTime)}</h4>



        <Button type="button" variant="contained" style={{ backgroundColor: '#bd8b13', width: '45%', height: "50%", margin: "20px" }} onClick={(e) => { submitHelper(props.f) }}>  <b>Select</b></Button>
      </div>


    </div>
  );
}

export default flightSelectionCard;