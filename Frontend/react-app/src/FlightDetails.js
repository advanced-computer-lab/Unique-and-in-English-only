import React from "react";
import "./FlightDetails.css";
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

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US");

}

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

function FlightDetails(props) {
  const paperStyle = { padding: 20, height: '300px', width: '600px', margin: "10px auto", minheight: '400px' }

  const deleteHelper = async (flightObj) => {
    props.deleteHandler(flightObj)
  }
  const updateHelper = async (flightObj) => {
    props.updateHandler(flightObj)
  }
  return (
  
      <Grid>
  
          <Paper elevation={10} style={paperStyle}>
          <Grid container spacing={1}>

          <Grid item xs={12} align="center">
            <h2 className="fNumber">Flight Number: {props.f.FlightNumber}</h2>
            </Grid>

            <Grid item xs={6}>
            <h3>From: {props.f.DeparturePort}</h3>
            </Grid>

            <Grid item xs={6}>
            <h3>To: {props.f.ArrivalPort}</h3>
            </Grid>

            <Grid item xs={6}>
            <h3>Departure Time: {formatDate(props.f.DepartureTime)}</h3>
            </Grid>

            <Grid item xs={6}>
            <h3>Arrival Time: {formatDate(props.f.ArrivalTime)}</h3>
            </Grid>
            <Grid item xs={12}>
            <Button id="btn" type="button" variant="contained" style={{ backgroundColor: '#bd8b13', width: '45%', float: "left" }} onClick={(e) => { deleteHelper(props.f) }}>  <b>Delete</b></Button>
            <Button type="button" variant="contained" style={{ backgroundColor: '#bd8b13', width: '45%', float: "right" }} onClick={(e) => { updateHelper(props.f) }}>  <b>update</b></Button>
         </Grid>
          </Grid>
          </Paper>
        </Grid>
        

  );
}

export default FlightDetails;