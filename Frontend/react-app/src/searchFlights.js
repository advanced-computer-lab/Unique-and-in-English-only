import axios from 'axios';
import { useState } from 'react'
import { confirm } from "react-confirm-box";
import FlightDetails from './FlightDetails';
import "./searchFlights.css";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Avatar, createMuiTheme,FormControlLabel,ThemeProvider } from '@mui/material';
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ScreenSearchDesktopOutlinedIcon from '@mui/icons-material/ScreenSearchDesktopOutlined';


const paperStyle={padding:20, height:'1300px',width:600,margin:"150px auto",minheight: '1300px'}
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
function SearchFlight() {
  const [values, setValues] = useState({
    FlightNumber: '',
    DepartureTime: '',
    ArrivalTime: '',
    EconomySeatsNumber: '',
    BuisnessSeatsNumber: '',
    DeparturePort: '',
    ArrivalPort: '',
    ArrivalTerminal:'',
    DepartureTerminal:'',
    BusinessPrice:'',
    EconomyPrice:'',
    BaggageAllowance:'',
    TripDuration:''
  });

  const [flight, setFlight] = useState([]);

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
    }
  }
  const DeleteClickHandler = async (flightObj) => {
    const id = flightObj._id;
    const result = await confirm("Are you sure to delete this flight?");
    if (result) {
      axios.delete('http://localhost:150/flight/deleteFlight/' + id)
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



  function UpdateClickHandler(flightObj) {
    const id = flightObj._id;
    window.location.href = `http://localhost:3000/updateFlight/${id}`
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post('http://localhost:150/flight/searchFlight', values, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    })
      .then(function (result) {
        setFlight(result.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 if(flight.length>=1){
  return (
    <ThemeProvider theme={theme}>
  <div>
    <h1 style={{margin:"20px"}}>    Search Flights</h1>
    <div className="container1">
      <div className="results">
      <h1 align="center">Search Results</h1>
      <div align="center"> 
      <ScreenSearchDesktopOutlinedIcon color="primary" style={{fontSize:"150"}}/>
      
      </div>
      
      <div id="flightsDisplay">
        
      
      
      
        {
          flight.map((f) =>
          <FlightDetails f={f} deleteHandler={DeleteClickHandler} updateHandler={UpdateClickHandler} />
          )}
          
      </div>
      <div align="center"> 
      <h2>
      <a href="/searchFlight">Search for other flights</a>
      </h2>
        </div>
      
      </div>
 </div>
    </div>
    </ThemeProvider>
  )}
  else{
    return(

      <ThemeProvider theme={theme}>
    <Container>
      
        <Grid>
        <Paper elevation={10} style={paperStyle}>
        <Grid align="center" >
            <SearchOutlinedIcon  color="primary" style={{fontSize:"150"}}/>
            </Grid>
            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
            <form noValidate autoComplete='off' >

            <Grid container spacing={2}>

              <Grid item xs={6}>
        <h2 style={{color:"#be8b14"}}>Flight Number:</h2>
         <TextField
         
         label="Flight Number"
         variant="standard"
         placeholder="Enter Flight Number"
         color="primary"
         style={{width:'200' }}
         minLength="3"
         id="FlightNumber"
         value={values.FlightNumber} onChange={set('FlightNumber')} 
         
         />
         </Grid>

         <Grid item xs={6} align="center">

          <h2 style={{color:"#be8b14"}}>Trip Duration:</h2>
          <TextField
          type="text"
          id="ArrivalTerminal"
          variant="standard"
          label="Trip Duration"
          placeholder="Enter Trip Duration"
          color="primary"
          style={{width:'200' }}
          value={values.TripDuration} 
          onChange={set('TripDuration')}
          />
        </Grid>

        
         
         

         <Grid item xs={6}  >
        <h2 style={{color:"#be8b14"}}>Arrival Time:</h2>
         <TextField
         type="date"
         id="ArrivalTime"
         variant="standard"
         color="primary"
         style={{width:'200' }}
        required 
        value={values.ArrivalTime} onChange={set('ArrivalTime')}
         />
         </Grid>

         <Grid item xs={6} align="center"> 
         <h2 style={{color:"#be8b14"}}>Departure Time:</h2>
         
         <TextField 
         type="date"
         id="DepartureTime"
         variant="standard"
         color="primary"
         style={{width:'200' }}
        required
        value={values.DepartureTime} onChange={set('DepartureTime')}
         />
         </Grid>

         
         
         <Grid item xs={6}>
        <h2 style={{color:"#be8b14"}}>Business Seats:</h2>
         <TextField
         type="number"
         id="BuisnessSeatsNumber"
         label="Number of Business Seats"
         variant="standard"
         color="primary"
         style={{width:'200' }}
        alue={values.BuisnessSeatsNumber} 
        onChange={set('BuisnessSeatsNumber') }
         />
        </Grid>

        <Grid item xs={6} align="center">
        <h2 style={{color:"#be8b14"}}>Economy Seats:</h2>
         <TextField
         type="number"
         id="EconomySeatsNumber"
         variant="standard"
         color="primary"
         style={{width:'200' }}
        label="Number of Economy Seats"
        value={values.EconomySeatsNumber}
        onChange={set('EconomySeatsNumber')}
         />
         </Grid>


        <Grid item xs={6} >
        <h2 style={{color:"#be8b14"}}>Departure Port:</h2>
         <TextField
         type="text"
         id="DeparturePort"
         variant="standard"
         label="Departure Port"
         placeholder="Enter Departure Port"
         color="primary"
         style={{width:'200' }}
        value={values.DeparturePort} 
        onChange={set('DeparturePort')}
         />
         </Grid>

         <Grid item xs={6} align="center">
        <h2 style={{color:"#be8b14"}}>Arrival Port:</h2>
         <TextField
         type="text"
         id="ArrivalPort"
         variant="standard"
         label="Arrival Port"
         placeholder="Enter Arrival Port"
         color="primary"
         style={{width:'200' }}
        value={values.ArrivalPort} 
        onChange={set('ArrivalPort')}
         />
         </Grid>

         <Grid item xs={6} >
        <h2 style={{color:"#be8b14"}}>Departure Terminal:</h2>
         <TextField
         type="text"
         id="DepartureTerminal"
         variant="standard"
         label="Departure Terminal"
         placeholder="Enter Departure Terminal"
         color="primary"
         style={{width:'200' }}
        value={values.DepartureTerminal} 
        onChange={set('DepartureTerminal')}
         />
         </Grid>

         <Grid item xs={6} align="center">
        <h2 style={{color:"#be8b14"}}>Arrival Terminal:</h2>
         <TextField
         type="text"
         id="ArrivalTerminal"
         variant="standard"
         label="Arrival Terminal"
         placeholder="Enter Arrival Terminal"
         color="primary"
         style={{width:'200' }}
        value={values.ArrivalTerminal} 
        onChange={set('ArrivalTerminal')}
         />
         </Grid>

         <Grid item xs={6} >
        <h2 style={{color:"#be8b14"}}>Business Price:</h2>
         <TextField
         type="text"
         id="BusinessPrice"
         variant="standard"
         label="BusinessPrice"
         placeholder="Enter Business Price"
         color="primary"
         style={{width:'200' }}
        value={values.BusinessPrice} 
        onChange={set('BusinessPrice')}
         />
         </Grid>

         <Grid item xs={6} align="center">
        <h2 style={{color:"#be8b14"}}>Economy Price:</h2>
         <TextField
         type="text"
         id="EconomyPrice"
         variant="standard"
         label="Economy Price"
         placeholder="Enter Economy Price"
         color="primary"
         style={{width:'200' }}
        value={values.EconomyPrice} 
        onChange={set('EconomyPrice')}
         />
         </Grid>

         <Grid item xs={6} >
        <h2 style={{color:"#be8b14"}}>Baggage Allowance:</h2>
         <TextField
         type="text"
         id="BaggageAllowance"
         variant="standard"
         label="Baggage Allowance"
         placeholder="Enter Baggage Allowance"
         color="primary"
         style={{width:'200' }}
        value={values.BaggageAllowance} 
        onChange={set('BaggageAllowance')}
         />
         </Grid>

         
       

         
         
         
        
        
         </Grid>
         <br/>
        <br/>
        <br/>
        <br/>
         <Button margin="5" type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'100%',display:'block'}} onClick={(e) => { onSubmit(e) }}>SEARCH</Button>

        

        

         </form>
         </Box>


          </Paper>
         
        </Grid>
        </Container>
      </ThemeProvider>
     
    )
  }
}

function removeObjectFromArray(flight, flightObj) {

  return flight.filter(function (ele) {
    return ele != flightObj;
  });
}
export default SearchFlight;
