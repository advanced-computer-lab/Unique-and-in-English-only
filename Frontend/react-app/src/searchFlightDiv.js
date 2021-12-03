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
import { Avatar, createMuiTheme,FormControlLabel,ThemeProvider } from '@mui/material';

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



const paperStyle={padding:20, height:'400px',width:'800px',margin:"20px auto",minheight: '500px',minwidth:'1000px'}


const airports = [
    { airportName: "LAX", city: "Los Angeles" },
    { airportName: "CAI", city: "Cairo" },
    { airportName: "JRO", city: "Arusha" }
]

const cabinOptions = [
    { class: "Buisness" },
    { class: "Economy" }
]

function SearchFlightDiv() {

    const set = name => {
        return ({ target: { value } }) => {
            setValues(oldValues => ({ ...oldValues, [name]: value }));
        }
    }

    const [inputFlyingFrom, setInputFlyingFrom] = React.useState({ airportName: "", city: "" });
    const [inputFlyingTo, setInputFlyingTO] = React.useState({ airportName: "", city: "" });

    const [values, setValues] = useState({
        outboundDate: '',
        returnDate: '',
        adults: '',
        children: '',
        cabin: 'Buisness'

    });

    const [flyingFrom, setFlyingFrom] = useState(null);
    const [flyingTo, setFlyingTo] = useState(null);
    const history = useHistory();
    const confirmSearch = async (event) => {

        const element = (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {new Date().toLocaleTimeString()}.</h2>
            </div>
        );
        const flight = {};
        flight['flyingFrom'] = flyingFrom;
        flight['flyingTo'] = flyingTo;
        for (const key in values) {
            // if (values.hasOwnProperty(key)) {
            //     const element = values[key];
            // }
            flight[key] = values[key];
        }
        event.preventDefault();
        axios.post('http://localhost:150/flight/searchFlightPassenger', flight)
            .then(
                history.push("/flightSelection")
            )
            .catch(function (error) {
                console.log(error);
            });


    }

    return (
        <ThemeProvider theme={theme}>
    <Container>
        
    <Grid align="center">
        <Paper elevation={24} rounded style={paperStyle}>
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <h4 style={{color:"#be8b14"}}>From:</h4>
            <Autocomplete
                    id="flying-from-box"
                    options={airports}
                    value={flyingFrom}
                    defaultValue={{ airportName: "LAX", city: "Los Angeles" }}
                    onChange={(_, newVal) => {
                        setFlyingFrom(newVal);
                       
                    }}
                    // inputValue={inputFlyingFrom}
                    // onInputChange={(_, newInputValue) => {
                    //     setInputFlyingFrom(newInputValue)
                    // }}
                    isOptionEqualToValue={(option, value) => {
                        if (option.airportName === value.airportName)
                            return true;
                    }}
                    getOptionLabel={(option) => option.airportName + " " + option.city}
                    renderInput={(params) => <TextField {...params} label="Flying From" />}
         
            />
         </Grid>
         <Grid item xs={6}>
                <h4 style={{color:"#be8b14"}}>To:</h4>
                <Autocomplete
                    id="flying-to-box"
                    options={airports}
                    value={flyingTo}
                    defaultValue={{ airportName: "CAI", city: "Cairo" }}
                    onChange={(_, newVal) => {
                        setFlyingTo(newVal);
                        
                    }}
                    isOptionEqualToValue={(option, value) => {
                        if (option.airportName === value.airportName)
                            return true;
                    }}
                    getOptionLabel={(option) => option.airportName + " " + option.city}
                    renderInput={(params) => <TextField {...params} value={values.flyingTo} onChange={set('flyingTo')} label="Flying to" />}
                />
         </Grid>
         <Grid item xs={4}>
                <h4 style={{color:"#be8b14"}}>Outbound Date:</h4>
                <TextField id="outboundDate" value={values.outboundDate} onChange={set('outboundDate')} type="date" variant="standard"> </TextField>
         </Grid>
         <Grid item xs={4}>
         <h4 style={{color:"#be8b14"}}>Return Date:</h4>
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
                <h4 style={{color:"#be8b14"}}>Cabin:</h4>
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

         <Grid item xs={6}>
         <h4 style={{color:"#be8b14"}}>Adults:</h4>
         <TextField 
            label="adults"
            variant="standard"
            value={values.adults}
            onChange={set('adults')}
            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
         </Grid>

         <Grid item xs={6}>
         <h4 style={{color:"#be8b14"}}>Children:</h4>
         <TextField label="children"
         variant="standard"
                        value={values.children}
                        onChange={set('children')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ChildCareIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
         </Grid>
         <Grid item xs={12}>
             <br/>
         <Button style={{backgroundColor:'#bd8b13',width:'50%',display:'block'}} onClick={confirmSearch} variant="contained">Search</Button>
             </Grid>





                </Grid>
                </Paper>
                </Grid>
                
        </Container>
        </ThemeProvider>
    )
}




export default SearchFlightDiv;