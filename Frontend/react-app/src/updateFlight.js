import axios from 'axios';
import { PromiseProvider } from 'mongoose';
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PopUp from './popUp.js'
import "./searchFlights.css";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { Avatar, createMuiTheme, FormControlLabel, ThemeProvider } from '@mui/material';
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

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

const paperStyle = { padding: 20, height: '1300px', width: 600, margin: "150px auto", minheight: '1300px' }


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


function UpdateFlight(props) {
  let { id } = useParams();
  const [flag, setFlag] = useState(true)
  const formatDate = (d) => {
    var month = ""
    var day = ""
    var year = ""
    year = d.getFullYear()
    month = d.getMonth()
    day = d.getDate()
    var l1 = month.toString().length
    var l2 = day.toString().length
    if (l1 < 2) {
      month = '0' + month
    }

    if (l2 < 2) {
      day = '0' + day
    }
    return year + '-' + month + '-' + day
  }
  var startValues = {
    FlightNumber: '',
    DepartureTime: '',
    ArrivalTime: '',
    EconomySeatsNumber: '',
    BuisnessSeatsNumber: '',
    DeparturePort: '',
    ArrivalPort: '',
    ArrivalTerminal: '',
    DepartureTerminal: '',
    BusinessPrice: '',
    EconomyPrice: '',
    BaggageAllowance: '',
    TripDuration: ''
  }

  if (flag) {
    axios.get('http://localhost:150/flight/getFlightById/' + id)
      .then(function (response) {

        startValues = response.data

        var d1 = new Date(startValues.DepartureTime)

        var d2 = new Date(startValues.ArrivalTime)

        setValues({
          FlightNumber: startValues.FlightNumber,
          DepartureTime: formatDate(d1),
          ArrivalTime: formatDate(d2),
          EconomySeatsNumber: startValues.EconomySeatsNumber,
          BuisnessSeatsNumber: startValues.BuisnessSeatsNumber,
          DeparturePort: startValues.DeparturePort,
          ArrivalPort: startValues.ArrivalPort,
          DepartureTerminal: startValues.DepartureTerminal,
          ArrivalTerminal: startValues.ArrivalTerminal,
          BusinessPrice: startValues.BusinessPrice,
          EconomyPrice: startValues.EconomyPrice,
          BaggageAllowance: startValues.BaggageAllowance,
          TripDuration: startValues.TripDuration,
        })
        setFlag(false)
      })
      .catch(function (error) {
        console.log(error);
        setFlag(false)
      });
  }

  const classes = useStyles();
  const [buttonSuccessPopup, setButtonSuccessPopup] = useState(false);
  const [buttonFailurePopup, setButtonFailurePopup] = useState(false);

  const [depTimeValidate, setdepTimeValidate] = useState("");
  const [depTimeValidateFlag, setdepTimeValidateFlag] = useState(false);

  const [arrTimeValidate, setarrTimeValidate] = useState("");
  const [arrTimeValidateFlag, setarrTimeValidateFlag] = useState(false);

  const [economySeatsValidate, seteconomySeatsValidate] = useState("");
  const [economySeatsValidateFlag, seteconomySeatsValidateFlag] = useState(false);

  const [businessSeatsValidate, setbusinessSeatsValidate] = useState("");
  const [businessSeatsValidateFlag, setbusinessSeatsValidateFlag] = useState(false);

  const [values, setValues] = useState({
    FlightNumber: startValues.FlightNumber,
    DepartureTime: startValues.DepartureTime,
    ArrivalTime: startValues.ArrivalTime,
    EconomySeatsNumber: startValues.EconomySeatsNumber,
    BuisnessSeatsNumber: startValues.BuisnessSeatsNumber,
    DeparturePort: startValues.DeparturePort,
    ArrivalPort: startValues.ArrivalPort,
    DepartureTerminal: startValues.DepartureTerminal,
    ArrivalTerminal: startValues.ArrivalTerminal,
    DepartureTerminal: startValues.DepartureTerminal,
    BusinessPrice: startValues.BusinessPrice,
    EconomyPrice: startValues.EconomyPrice,
    BaggageAllowance: startValues.BaggageAllowance,
    TripDuration: startValues.TripDuration,
  })

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
    }
  }
  const onSubmit = async (event) => {
    var flag1 = true;
    var flag2 = true;
    var flag3 = true;
    var flag4 = true;

    var today = new Date();
    today.setHours(0, 0, 0, 0)
    if (values.ArrivalTime != '') {
      var arrDate = new Date(values.ArrivalTime)

    }
    if (values.DepartureTime != '') {
      var depDate = new Date(values.DepartureTime)
    }
    if (values.DepartureTime != '' && depDate.getTime() < today.getTime()) {
      setdepTimeValidate("Departure date has already passed")
      flag1 = false
    }
    else {
      flag1 = true
      setdepTimeValidate("")
    }
    if (values.DepartureTime != '' && values.ArrivalTime != '' && arrDate.getTime() < depDate.getTime()) {
      setarrTimeValidate("arrival date can`t be before departure date")
      flag2 = false
    }
    else {
      flag2 = true
      setarrTimeValidate("")
    }
    if (values.EconomySeatsNumber < 0) {
      seteconomySeatsValidate("number of seats can`t be negative")
      flag3 = false
    }
    else {
      flag3 = true
      seteconomySeatsValidate("")
    }
    if (values.BuisnessSeatsNumber < 0) {
      setbusinessSeatsValidate("number of seats can`t be negative")
      flag4 = false
    }
    else {
      flag4 = true
      setbusinessSeatsValidate("")
    }
    console.log(`flag1  ${flag1} &&  flag2 ${flag2} && flag3 ${flag3} && flag4 ${flag4}`);
    if (flag1 && flag2 && flag3 && flag4) {
      event.preventDefault();
      axios.put('http://localhost:150/flight/updateFlight/' + id, values)
        .then(function (response) {
          console.log(response);
          setButtonSuccessPopup(true);
        })
        .catch(function (error) {
          console.log(error);
          setButtonFailurePopup(true)
        });
    }
  }

  return (

    <ThemeProvider theme={theme}>
      <Container>

        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center" >
              <AirplaneTicketOutlinedIcon color="primary" style={{ fontSize: "100" }} />
            </Grid>
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}>
              <form noValidate autoComplete='off' >

                <Grid container spacing={2}>

                  <Grid item xs={6}>
                    <h2 style={{ color: "#be8b14" }}>Flight Number:</h2>
                    <TextField

                      label="Flight Number"
                      variant="standard"
                      placeholder="Enter Flight Number"
                      required
                      color="primary"
                      style={{ width: '200' }}
                      minLength="3"
                      id="FlightNumber"
                      value={values.FlightNumber} onChange={set('FlightNumber')}

                    />
                  </Grid>

                  <Grid item xs={6} align="center">

                    <h2 style={{ color: "#be8b14" }}>Trip Duration:</h2>
                    <TextField
                      type="text"
                      id="ArrivalTerminal"
                      variant="standard"
                      label="Arrival Terminal"
                      placeholder="Enter arrival Terminal"
                      required
                      color="primary"
                      style={{ width: '200' }}
                      required
                      value={values.TripDuration}
                      onChange={set('TripDuration')}
                    />
                  </Grid>





                  <Grid item xs={6}  >
                    <h2 style={{ color: "#be8b14" }}>Arrival Time:</h2>
                    <TextField
                      type="date"
                      id="ArrivalTime"
                      variant="standard"
                      required
                      color="primary"
                      style={{ width: '200' }}
                      required
                      value={values.ArrivalTime} onChange={set('ArrivalTime')}
                      helperText={arrTimeValidate}
                      error={arrTimeValidateFlag}
                    />
                  </Grid>

                  <Grid item xs={6} align="center">
                    <h2 style={{ color: "#be8b14" }}>Departure Time:</h2>

                    <TextField
                      type="date"
                      id="DepartureTime"
                      variant="standard"
                      required
                      color="primary"
                      style={{ width: '200' }}
                      required
                      value={values.DepartureTime} onChange={set('DepartureTime')}
                      helperText={depTimeValidate}
                      error={depTimeValidateFlag}
                    />
                  </Grid>



                  <Grid item xs={6}>
                    <h2 style={{ color: "#be8b14" }}>Business Seats:</h2>
                    <TextField
                      type="number"
                      id="BuisnessSeatsNumber"
                      label="Number of Business Seats"
                      variant="standard"
                      required
                      color="primary"
                      style={{ width: '200' }}
                      required
                      alue={values.BuisnessSeatsNumber}
                      onChange={set('BuisnessSeatsNumber')}
                      helperText={businessSeatsValidate}
                      error={businessSeatsValidateFlag}
                    />
                  </Grid>

                  <Grid item xs={6} align="center">
                    <h2 style={{ color: "#be8b14" }}>Economy Seats:</h2>
                    <TextField
                      type="number"
                      id="EconomySeatsNumber"
                      variant="standard"
                      required
                      color="primary"
                      style={{ width: '200' }}
                      required
                      label="Number of Economy Seats"
                      value={values.EconomySeatsNumber}
                      onChange={set('EconomySeatsNumber')}
                      helperText={economySeatsValidate}
                      error={economySeatsValidateFlag}
                    />
                  </Grid>


                  <Grid item xs={6} >
                    <h2 style={{ color: "#be8b14" }}>Departure Port:</h2>
                    <TextField
                      type="text"
                      id="DeparturePort"
                      variant="standard"
                      label="Departure Port"
                      placeholder="Enter Departure Port"
                      required
                      color="primary"
                      style={{ width: '200' }}
                      required
                      value={values.DeparturePort}
                      onChange={set('DeparturePort')}
                    />
                  </Grid>

                  <Grid item xs={6} align="center">
                    <h2 style={{ color: "#be8b14" }}>Arrival Port:</h2>
                    <TextField
                      type="text"
                      id="ArrivalPort"
                      variant="standard"
                      label="Arrival Port"
                      placeholder="Enter Arrival Port"
                      required
                      color="primary"
                      style={{ width: '200' }}
                      required
                      value={values.ArrivalPort}
                      onChange={set('ArrivalPort')}
                    />
                  </Grid>

                  <Grid item xs={6} >
                    <h2 style={{ color: "#be8b14" }}>Departure Terminal:</h2>
                    <TextField
                      type="text"
                      id="DepartureTerminal"
                      variant="standard"
                      label="Departure Terminal"
                      placeholder="Enter Departure Terminal"
                      required
                      color="primary"
                      style={{ width: '200' }}
                      required
                      value={values.DepartureTerminal}
                      onChange={set('DepartureTerminal')}
                    />
                  </Grid>

                  <Grid item xs={6} align="center">
                    <h2 style={{ color: "#be8b14" }}>Arrival Terminal:</h2>
                    <TextField
                      type="text"
                      id="ArrivalTerminal"
                      variant="standard"
                      label="Arrival Terminal"
                      placeholder="Enter arrival Terminal"
                      required
                      color="primary"
                      style={{ width: '200' }}
                      required
                      value={values.ArrivalTerminal}
                      onChange={set('ArrivalTerminal')}
                    />
                  </Grid>

                  <Grid item xs={6} >
                    <h2 style={{ color: "#be8b14" }}>Business Price:</h2>
                    <TextField
                      type="text"
                      id="BusinessPrice"
                      variant="standard"
                      label="BusinessPrice"
                      placeholder="Enter arrival Terminal"
                      required
                      color="primary"
                      style={{ width: '200' }}
                      required
                      value={values.BusinessPrice}
                      onChange={set('BusinessPrice')}
                    />
                  </Grid>

                  <Grid item xs={6} align="center">
                    <h2 style={{ color: "#be8b14" }}>Economy Price:</h2>
                    <TextField
                      type="text"
                      id="EconomyPrice"
                      variant="standard"
                      label="Economy Price"
                      placeholder="Enter Economy Price"
                      required
                      color="primary"
                      style={{ width: '200' }}
                      required
                      value={values.EconomyPrice}
                      onChange={set('EconomyPrice')}
                    />
                  </Grid>

                  <Grid item xs={6} >
                    <h2 style={{ color: "#be8b14" }}>Baggage Allowance:</h2>
                    <TextField
                      type="text"
                      id="BaggageAllowance"
                      variant="standard"
                      label="Baggage Allowance"
                      placeholder="Enter Baggage Allowance"
                      required
                      color="primary"
                      style={{ width: '200' }}
                      required
                      value={values.BaggageAllowance}
                      onChange={set('BaggageAllowance')}
                    />
                  </Grid>









                </Grid>
                <br />
                <br />
                <br />
                <br />
                <Button margin="5" type="button" variant="contained" style={{ backgroundColor: '#bd8b13', width: '100%', display: 'block' }} onClick={(e) => { onSubmit(e) }}>Update</Button>
                <PopUp trigger={buttonSuccessPopup} setTrigger={setButtonSuccessPopup}>
                  <h3>Flight updated Successfully</h3>
                </PopUp>
                <PopUp trigger={buttonFailurePopup} setTrigger={setButtonFailurePopup}>
                  <h3>error : flight was not updated</h3>
                </PopUp>




              </form>
            </Box>


          </Paper>

        </Grid>
      </Container>
    </ThemeProvider>











  )
}
export default UpdateFlight;