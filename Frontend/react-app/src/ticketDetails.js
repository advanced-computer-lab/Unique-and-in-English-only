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
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
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
  const [open1, setOpen1] = React.useState(false);
  const handleClick1 = () => {
    setOpen1(true);
  };

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };
  const [open2, setOpen2] = React.useState(false);

  const handleClick2 = () => {
    setOpen2(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen2(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const paperStyle = { padding: 20, height: '700px', width: '800px', margin: "10px auto", minheight: '400px' }

const deleteHelper= async(flightObj) =>{
  props.deleteHandler(flightObj);
}
const editReturnHelper= async(flightObj) =>{
  props.editReturnHandler(flightObj);
}
const editDepartureHelper= async(flightObj) =>{
  props.editDepartureHandler(flightObj);
}
const sendEmailHelper= async(flightObj) =>{
  props.sendEmailHandler(flightObj);
  handleClick2();
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
          <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'25%',float:"Right"}} onClick={(e) =>{editDepartureHelper(props.f)}}>Edit</Button>
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
          <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'25%',float:"Right"}} onClick={(e) =>{sendEmailHelper(props.f)}}>Send email</Button>
    </div>
        </Paper>
         </Grid>
        </Grid>
        <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
          Email is sent!
        </Alert>
      </Snackbar>
      </Stack>
    </Container>
  );
}

export default TicketDetails;