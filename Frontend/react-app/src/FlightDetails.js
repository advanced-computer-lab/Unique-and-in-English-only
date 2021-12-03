import React from "react";
import "./FlightDetails.css";
import axios from 'axios'
import ListFlights from "./listFlights";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Avatar, createMuiTheme,FormControlLabel,ThemeProvider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import AirlinesIcon from '@mui/icons-material/Airlines';

const theme=createMuiTheme({
  palette:{
   primary:{
     main:'#be8b14'
    },
    secondary:{
      main:'#000000'
  }
}
})

const useStyles=makeStyles({
  airplane:{
    '&svg':{
      fontSize:30
    },

    h2:{
      backgroundColor:'#be8b14'
    }
    
  }
})

function FlightDetails(props) {
  const paperStyle={padding:20, height:'300px',width:'200',margin:"10px auto",minheight: '400px'}

const deleteHelper= async(flightObj) =>{
  props.deleteHandler(flightObj)
}
const updateHelper= async(flightObj) =>{
  props.updateHandler(flightObj)
}
  return (
    <Container >
    <Grid container spacing={2} >
    <Grid item xs={12} >
    <Paper elevation={10} style={paperStyle}>
    
      <h2 display>Flight Number: {props.f.FlightNumber}</h2>
      <h3>From: {props.f.DeparturePort}</h3>
      <h3>To: {props.f.ArrivalPort}</h3>
      <h4>Departure Time: {props.f.DepartureTime}</h4>
      <h4>Arrival Time: {props.f.ArrivalTime}</h4>
      <Button id="btn" type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'45%',float:"left"}} onClick={(e) => { deleteHelper(props.f) }}>  <b>Delete</b></Button>
      <Button  type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'45%',float:"right"}} onClick={(e) => { updateHelper(props.f) }}>  <b>update</b></Button>
      </Paper>
    </Grid>
    <Grid>
    
      </Grid>
    </Grid>
    </Container>
  );
}

export default FlightDetails;