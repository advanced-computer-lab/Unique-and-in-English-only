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
  const paperStyle = { padding: 20, height: '500px', width: '800px', margin: "10px auto", minheight: '400px' }

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
    
        <Container >
      <Grid container spacing={2} >
        <Grid item xs={12} >
          <Paper elevation={10} style={paperStyle}>
           <h3>Flight Number: {props.f.outgoingFlight.FlightNumber}</h3>
      <div className="">
          <p> From: {props.f.outgoingFlight.DeparturePort+' ----->'} {props.f.outgoingFlight.ArrivalPort}</p>
          <p>Departure Date:{props.f.outgoingFlight.DepartureTime+' '}, Arrival Date:{props.f.outgoingFlight.ArrivalTime} </p>
          <p>Chosen Cabin:{props.f.cabin+' ' } , Chosen Seats:{looper(props.f.outgoingSeats)} </p>
      </div>
      <h3>Flight Number: {props.f.returnFlight.FlightNumber}</h3>

      <div className="">
          <p> From: {props.f.returnFlight.DeparturePort+" ---->"}  {props.f.returnFlight.ArrivalPort}</p>
        
          <p>Departure Date:{props.f.returnFlight.DepartureTime+' '} , Arrival Date:{props.f.returnFlight.ArrivalTime}</p>
          <p>Chosen Cabin:{props.f.cabin+' '} , Chosen Seats:{looper(props.f.returnSeats)} </p>
          <p>Confirmation Number:{props.f.confirmationNum}</p>
          <p>Total Price:{props.f.TotalPrice} </p>
      </div>
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