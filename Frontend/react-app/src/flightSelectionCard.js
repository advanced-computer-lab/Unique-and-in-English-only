import React from "react";
import "./FlightDetails.css";
import axios from 'axios'
import ListFlights from "./listFlights";
import Button from '@mui/material/Button';
import "./flightSelectionCard.css"
import { useHistory } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const paperStyle={padding:20, height:'480px',width:'600px',margin:"50px auto",minheight: '1300px'}


function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US");
}

function flightSelectionCard(props) {


  const cabin = props.cabin;
  var price = 0;

  if (cabin == "Business") {
    price = props.f.BusinessPrice;
  }
  else {
    price = props.f.EconomyPrice;
  }



  const submitHelper = async (flightObj) => {
    props.submitHandler(flightObj)
  }
  const updateHelper = async (flightObj) => {
    props.updateHandler(flightObj)
  }
  return (
    <Grid>
      <Paper style={paperStyle} elevation={10}>
        <Grid container spacing={2}>
        <Grid item xs={12} align="center">
      <h2 className="colorBrown">Flight Number: {props.f.FlightNumber}</h2>
      </Grid>

      <Grid item xs={6}>
      <h3 className>From: {props.f.DeparturePort}</h3>
      </Grid>

      <Grid item xs={6}>
      <h3>To: {props.f.ArrivalPort}</h3>
      </Grid>

      <Grid item xs={6}>
      <h3>Baggage: {props.f.baggageAllowance} kg</h3>
      </Grid>

      <Grid item xs={6}>
      <h3>Trip Duration: {props.f.TripDuration} </h3>
      </Grid>

      <Grid item xs={6}>
      <h3>Adult Price: ${price}</h3>
      </Grid>

      <Grid item xs={6}>
      <h3>Child Price: ${price * 0.5}</h3>
      </Grid>

      <Grid item xs={6}>
      <h3>Departure Time: {formatDate(props.f.DepartureTime)}</h3>
      </Grid>

      <Grid item xs={6}>
      <h3>Arrival Time: {formatDate(props.f.ArrivalTime)}</h3>
      </Grid>

      <Grid item xs={12} align="right">
      <Button type="button" variant="contained" style={{ backgroundColor: '#bd8b13', width: '45%', height: "50%", margin: "20px" }} onClick={(e) => { submitHelper(props.f) }}>  <b>Select</b></Button>
      </Grid>



      </Grid>
      </Paper>

      

    </Grid>
  );
}

export default flightSelectionCard;