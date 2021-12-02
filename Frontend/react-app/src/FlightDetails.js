import React from "react";
import "./FlightDetails.css";
import axios from 'axios'
import ListFlights from "./listFlights";
import Button from '@mui/material/Button';



function FlightDetails(props) {
  
const deleteHelper= async(flightObj) =>{
  props.deleteHandler(flightObj)
}
const updateHelper= async(flightObj) =>{
  props.updateHandler(flightObj)
}
  return (
    <div className="main">
      
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
            </div>
      </div>  
      <div className="details-Buttons">
        <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'25%'}} onClick={(e) => { deleteHelper(props.f) }}>  <b>Delete</b></Button>
        <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'25%',float:"center"}} onClick={(e) => { updateHelper(props.f) }}>  <b>update</b></Button></div> 
        
      <hr/>
    </div>
  );
}

export default FlightDetails;