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
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { useHistory } from "react-router-dom";
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import Grid from '@mui/material/Grid';



//import userRouter from '../../../backEnd/routes/UserRoutes';

function TicketsView() {
  const [flight, setFlight] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:150/flight/listReservations').then(
      (result) => {
        setFlight(result.data)


      })

  }, []);
  const history = useHistory();
 const DeleteClickHandler = async (flightObj) => {
    
    const result = await confirm("Are you sure to cancel this flight?");
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
  const EditReturnHandler = async (flightObj) => {
    
    
      axios.post('http://localhost:150/flight/editReturnFlight',flightObj)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        history.push("/editReturnFlight");


    console.log("You click yes!");
    return;
  }

  const editDepartureHandler = async (flightObj) => {
    
    const result = await confirm("Are you sure to edit this flight? (By editing this flight,this ticket will be cancelled and money will be refunded)");
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
        history.push("/editDepartureFlight");
    }
    console.log("You click yes!");
    return;
  }
  const sendEmailHandler = async (flightObj) => {
    
    
    axios.post('http://localhost:150/flight/sendEmailOfFlight',flightObj)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      


  
  return;
}

  function UpdateClickHandler(flightObj) {
    const id = flightObj._id;
    window.location.href = `http://localhost:3000/updateFlight/${id}`
  }
  if(flight.length>0){
    return (
        <div style={{ marginTop:'100px'}}>
          <div align="center">
          <ConfirmationNumberOutlinedIcon color="primary" style={{ fontSize: "150" }}/>
            <h1 style={{color:"#bd8b13"}}>Tickets List</h1>
          </div>
            
        <br></br>
  

        
        {flight.map((f) =>
          <TicketDetails f={f} deleteHandler={DeleteClickHandler} editReturnHandler={EditReturnHandler} editDepartureHandler={editDepartureHandler} sendEmailHandler={sendEmailHandler} />
        )}


   
</div>
  );}
  else{
    return(
      <Grid style={{ marginTop: '120px' }} align="center" >
      <BlockOutlinedIcon color="primary" style={{ fontSize: "300" }} />
      <h1 style={{color:"#bd8b13"}}> No tickets available</h1>
    </Grid>
    )
  }
}

function removeObjectFromArray(flight, flightObj) {

  return flight.filter(function (ele) {
    return ele != flightObj;
  });


}



export default TicketsView; 