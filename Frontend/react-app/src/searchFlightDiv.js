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



const paperStyle={padding:20, height:'300px',width:'1200px',margin:"25px 0"}


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

    const [From, setFrom] = useState("");
     const [FromFlag, setFromFlag] = useState(false);

     const [To, setTo] = useState("");
     const [ToFlag, setToFlag] = useState(false);

     const [Adults, setAdults] = useState("");
     const [AdultsFlag, setAdultsFlag] = useState(false);

     const [Children, SetChildren] = useState("");
     const [ChildrenFlag, setChildrenFlag] = useState(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
    
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
      const [open1, setOpen1] = React.useState(false);
      const avatarStyle={backgroundColor:'#be8b14'}
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
        const outboundDateObj = new Date(flight.outboundDate);
        const returnDateObj = new Date(flight.returnDate);
        const invalidFlightDateFlag = outboundDateObj.getTime>returnDateObj.getTime
        const f1= new Date()
        f1.setHours(0,0,0,0)
        const flightDatePassed= f1.getTime()>outboundDateObj.getTime();
        
        if(flyingFrom==flyingTo ||flight.adults==0 ||  invalidFlightDateFlag ||flightDatePassed){
            setOpen2(true);
            return;
        }
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
        <Paper elevation={3} rounded style={paperStyle}>
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <h5>From</h5>
            <Autocomplete
            variant="standard"
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
         <Grid item xs={3}>
         <h5>To</h5>
                <Autocomplete
                    id="flying-to-box"
                    options={airports}
                    value={flyingTo}
                    error={ToFlag}
                    Texthelper={To}
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
         <Grid item xs={3}>
             <h5>Outbound Date</h5>
                
                <TextField id="outboundDate" value={values.outboundDate} onChange={set('outboundDate')} type="date" variant="standard"
                Texthelper={From}
                error={FromFlag}
                > </TextField>
         </Grid>
         <Grid item xs={3}>
         <h5>Return Date</h5>
                <TextField id="returnDate" value={values.returnDate} onChange={set('returnDate')} type="date" variant="standard"> </TextField>
         
         </Grid>
         

         <Grid item xs={4}>
         <h5>Adults</h5>
         <TextField 
            label="adults"
            variant="standard"
            value={values.adults}
            onChange={set('adults')}
            error={AdultsFlag}
            Texthelper={Adults}
            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
         </Grid>

         <Grid item xs={4}>
         <h5>Children</h5>
         <TextField label="children"
         variant="standard"
                        value={values.children}
                        onChange={set('children')}
                        error={ChildrenFlag}
                        Texthelper={Children}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ChildCareIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
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
         <Button style={{backgroundColor:'#bd8b13',width:'30%',display:'block',height:'60%'}} onClick={confirmSearch} variant="contained">Search</Button>
             </Grid>





                </Grid>
                </Paper>
                </Grid>

                <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
          The flight is created!
        </Alert>
      </Snackbar>
      </Stack>
      <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
          Invalid input!
        </Alert>
      </Snackbar>
      </Stack>
                
        </Container>
        </ThemeProvider>
    )
}




export default SearchFlightDiv;