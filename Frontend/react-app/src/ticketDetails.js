import React from "react";
import axios from 'axios'
import ListFlights from "./listFlights";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Avatar, createMuiTheme, FormControlLabel, ThemeProvider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import AirlinesIcon from '@mui/icons-material/Airlines';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#be8b14'
    },
    secondary: {
      main: '#000000'
    }
  }
})
const useStyles = makeStyles({
  airplane: {
    '&svg': {
      fontSize: 30
    },

    h2: {
      backgroundColor: '#be8b14'
    }

  }
})


function TicketDetails(props) {
  const paperStyle = { padding: 20, height: '700px', width: '800px', margin: "10px auto", minheight: '400px' }

const deleteHelper= async(flightObj) =>{
  props.deleteHandler(flightObj);
}
const editReturnHelper= async(flightObj) =>{
  props.editReturnHandler(flightObj);
}
 function looper(seats){
  var result=[];
  seats.forEach(element => {
     result.push("("+element.number+")")
   });
   return result;
 } 

  return (
    
        <Container >
      <Grid container spacing={2} >
        <Grid item xs={12} >
          <Paper elevation={10} style={paperStyle}>
           <h1>Flight Number: {props.f.outgoingFlight.FlightNumber}</h1>
      <div className="">
          <h5> From: {props.f.outgoingFlight.DeparturePort+' ----->'} {props.f.outgoingFlight.ArrivalPort}</h5>
          <h5>Departure Date:{props.f.outgoingFlight.DepartureTime+' '}, Arrival Date:{props.f.outgoingFlight.ArrivalTime} </h5>
          <h5>Cabin: {props.f.cabin+' ' } , Seats: {looper(props.f.outgoingSeats)} </h5>
          <div className="">
          <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'25%',float:"Right"}} onClick={(e) =>{deleteHelper(props.f)}}>Edit</Button>
</div>

      </div>
      <br /><br />
  
      <hr/>
      <h1>Flight Number: {props.f.returnFlight.FlightNumber}</h1>

          <h5> From: {props.f.returnFlight.DeparturePort+" ---->"}  {props.f.returnFlight.ArrivalPort}</h5>
        
          <h5>Departure Date:{props.f.returnFlight.DepartureTime+' '} , Arrival Date:{props.f.returnFlight.ArrivalTime}</h5>
          <h5>Cabin: {props.f.cabin+' '} , Seats: {looper(props.f.returnSeats)} </h5>
          <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'25%',float:"Right"}} onClick={(e) =>{editReturnHelper(props.f)}}>Edit</Button>
          <br /><br />

          <hr/>
          <h5>Confirmation Number: {props.f.confirmationNum}</h5>
          <h5>Total Price: ${props.f.TicketTotalPrice} </h5>

      <div className="">
          <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'25%',float:"Right"}} onClick={(e) =>{deleteHelper(props.f)}}>Cancel</Button>
    </div>
        </Paper>
         </Grid>
        </Grid>
    </Container>
  );
}

export default TicketDetails;