import React from "react";
import "./FlightDetails.css";
import axios from 'axios'
import ListFlights from "./listFlights";
import Button from '@mui/material/Button';
import "./flightSelectionCard.css"

import { useHistory } from "react-router-dom";

function flightSelectionCard(props) {


const submitHelper= async(flightObj) =>{
  props.submitHandler(flightObj)
}
const updateHelper= async(flightObj) =>{
  props.updateHandler(flightObj)
}
  return (
    <div className="main">
      
      <div className="select-container">
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
           
          
                <h4>Departure Time: {props.f.DepartureTime}</h4>
                <h4>Arrival Time: {props.f.ArrivalTime}</h4>
            
            
      
      
        <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'45%',height:"50%",margin:"20px"}} onClick={(e) => { submitHelper(props.f) }}>  <b>Select</b></Button>
     </div>
        
     
    </div>
  );
}

export default flightSelectionCard;