import './App.css';
//import Navbar from './navbar';
// import Home from './home';
import { Component, useState, useEffect } from 'react';
import axios from 'axios'
import { confirm } from "react-confirm-box";
import { Link } from "react-router-dom";
import FlightDetails from './FlightDetails';
import "./listFlights.css";
import TicketDetails from "./ticketDetails.js";

//import userRouter from '../../../backEnd/routes/UserRoutes';

function TicketsView() {
  const [flight, setFlight] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:150/flight/listReservations').then(
      (result) => {
        setFlight(result.data)


      })

  }, []);
 const DeleteClickHandler = async (flightObj) => {
    
    const result = await confirm("Are you sure to delete this flight?");
    if (result) {
      axios.post('http://localhost:150/flight/ticketDeletion',flightObj)
        .then(function (response) {
          console.log(response);
          const newFlights = removeObjectFromArray(flight, flightObj);
          setFlight(newFlights);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    console.log("You click yes!");
    return;
  }

  console.log("You click No!");

  function UpdateClickHandler(flightObj) {
    const id = flightObj._id;
    window.location.href = `http://localhost:3000/updateFlight/${id}`
  }
  if(flight.length>0){
    return (
        <div className="">
          <h1 style={{ marginTop: 70 }}>My Tickets </h1>
          <div className="content">
            
        <br></br>
  
<div className="table">
        
        {flight.map((f) =>
          <TicketDetails f={f} deleteHandler={DeleteClickHandler}  />
        )}

      </div>
    </div>
</div>
  );}
  else{
    return(
    <div>
      <h1>no flights available </h1>
    </div>
    )
  }
}

function removeObjectFromArray(flight, flightObj) {

  return flight.filter(function (ele) {
    return ele != flightObj;
  });


}



export default TicketsView; 