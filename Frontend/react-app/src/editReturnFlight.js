
import React from "react"
import "./searchFlightDiv.css"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { useState, ReactDOM } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Container } from "@mui/material";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Avatar, createMuiTheme,FormControlLabel,ThemeProvider } from '@mui/material';
import FlightSelectionCard from './flightSelectionCard'

function EditReturnFlight(){
    const [flight, setFlight] = useState([]);

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
     
      const history = useHistory();
      const [values, setValues] = useState({
        returnDate: '',
        cabin: 'Buisness'

    });
    const set = name => {
        return ({ target: { value } }) => {
            setValues(oldValues => ({ ...oldValues, [name]: value }));
        }
    }
    
    const paperStyle={padding:20, height:'180px',width:'1200px',margin:"50px 0"}
    
    const onSubmit = async ()=> {
        console.log(values)
        axios.post('http://localhost:150/flight/listReturnFlights',values).then((result) =>{
        setFlight(result.data)
        console.log(result.data)

    })
    }

    const onSelect =async (flight) => {
        axios.post('http://localhost:150/flight/selectEditedReturnFlight',flight).then(
    ).catch((error) =>console.log(error))
    history.push("/editReturnFlightSeats")
    
}

    return(
        <Grid align="center">
             <h2 style={{ marginTop:90 }}>Choose return date and cabin class</h2>
        <Paper elevation={3} rounded style={paperStyle}>
        <Grid container spacing={1}>
        <Grid item xs={3}>
         <h5>Return Date</h5>
                <TextField id="returnDate" value={values.returnDate} onChange={set('returnDate')} type="date" variant="standard"> </TextField>
         
         </Grid>
         <Grid item xs={4}>
         {/* <Autocomplete
                    id="cabin-box"
                    options={cabinOptions}
                    // value={values.cabin}
                    getOptionLabel={option => option.class}
                    renderInput={(params) => <TextField {...params} value={values.cabin} onChange={set('cabin')} label="Cabin" />}
                /> */}
                <h5>Cabin</h5>
                
                <Select
                color="primary"
                    labelId="cabin-select-label"
                    id="demo-simple-select"
                    value={values.cabin}
                    label="Cabin"
                    onChange={set('cabin')}
                    fullWidth
                    variant="standard"
                >
                    <MenuItem value={"Buisness"}>Buisness</MenuItem>
                    <MenuItem value={"Economy"}>Economy</MenuItem>
                </Select>
         
         </Grid>
         <Grid item xs={12} align="right">
             <br/>
         <Button style={{backgroundColor:'#bd8b13',width:'30%',display:'block',height:'60%'}} onClick={onSubmit} variant="contained">Search</Button>
             </Grid>





                </Grid>
                </Paper>
                {flight.map((f) =>
                    <FlightSelectionCard f={f}  submitHandler={onSelect} />
                  )}
                </Grid>
                
             

    )

}
export default EditReturnFlight;