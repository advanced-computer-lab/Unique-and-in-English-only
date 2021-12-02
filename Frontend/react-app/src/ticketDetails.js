import React from "react";
import axios from 'axios'
import ListFlights from "./listFlights";
import Button from '@mui/material/Button';



function TicketDetails(props) {
  
const deleteHelper= async(flightObj) =>{
  props.deleteHandler(flightObj);
}
 function looper(seats){
  var result=[];
  seats.forEach(element => {
     result.push("("+element.number+")")
   });
   return result;
 } 

  return (
    <div className="main">
           <h2>Flight Number: {props.f.outgoingFlight.FlightNumber}</h2>
      <div className="">
          <p> From: {props.f.outgoingFlight.DeparturePort} </p><p>To: {props.f.outgoingFlight.ArrivalPort} </p>
          <br />
          <p>Departure Date:{props.f.outgoingFlight.DepartureTime} </p><p>Arrival Date:{props.f.outgoingFlight.ArrivalTime} </p>
          <br />
          <p>Chosen Cabin:{props.f.Cabin} </p><p>Chosen Seats:{looper(props.f.outgoingSeats)} </p>
      </div>
      <h2>Flight Number: {props.f.returnFlight.FlightNumber}</h2>

      <div className="">
          <p> From: {props.f.returnFlight.DeparturePort} </p><p>To: {props.f.returnFlight.ArrivalPort} </p>
          <br />
          <p>Departure Date:{props.f.returnFlight.DepartureTime} </p><p>Arrival Date:{props.f.returnFlight.ArrivalTime} </p>
          <br />
          <p>Chosen Cabin:{props.f.Cabin} </p><p>Chosen Seats:{looper(props.f.returnSeats)} </p>
          <br/>
          <p>Confirmation Number:{props.f.confirmationNum}</p>
          <br />
          <p>Total Price:{props.f.TotalPrice} </p>
      </div>
      <div className="">
          <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'25%',float:"Right"}} onClick={(e) =>{deleteHelper(props.f)}}>Cancel</Button>
    </div>
    </div>
  );
}

export default TicketDetails;