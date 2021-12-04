import axios from 'axios';
import { useState } from 'react'
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
import { Avatar, createMuiTheme,FormControlLabel,ThemeProvider } from '@mui/material';
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import { PromiseProvider } from 'mongoose';
import InputAdornment from '@mui/material/InputAdornment';








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

export default function CreateFlight() {
  const classes = useStyles();
  const [buttonSuccessPopup, setButtonSuccessPopup] = useState(false);
  const [buttonFailurePopup, setButtonFailurePopup] = useState(false);

  const [flightNumberValidate, setflightNumberValidate] = useState("");
  const [flightNumberValidateFlag, setflightNumberValidateFlag] = useState(false);

  const [tripDurationValidate, settripDurationValidate] = useState("");
  const [tripDurationValidateFlag, settripDurationValidateFlag] = useState(false);

  const [arrTimeValidate, setarrTimeValidate] = useState("");
  const [arrTimeValidateFlag, setarrTimeValidateFlag] = useState(false);

  const [depTimeValidate, setdepTimeValidate] = useState("");
  const [depTimeValidateFlag, setdepTimeValidateFlag] = useState(false);
  
  const [businessSeatsValidate, setbusinessSeatsValidate] = useState("");
  const [businessSeatsValidateFlag, setbusinessSeatsValidateFlag] = useState(false);

  const [economySeatsValidate, seteconomySeatsValidate] = useState("");
  const [economySeatsValidateFlag, seteconomySeatsValidateFlag] = useState(false);

  const [depPortValidate, setdepPortValidate] = useState("");
  const [depPortValidateFlag, setdepPortValidateFlag] = useState(false);

  const [arrPortValidate, setarrPortValidate] = useState("");
  const [arrPortValidateFlag, setarrPortValidateFlag] = useState(false);

  const [depTerminalValidate, setdepTerminalValidate] = useState("");
  const [depTerminalValidateFlag, setdepTerminalValidateFlag] = useState(false);
  
  const [arrTerminalValidate, setarrTerminalValidate] = useState("");
  const [arrTerminalValidateFlag, setarrTerminalValidateFlag] = useState(false);

  const [businessPriceValidate, setbusinessPriceValidate] = useState("");
  const [businessPriceValidateFlag, setbusinessPriceValidateFlag] = useState(false);
  
  const [economyPriceValidate, seteconomyPriceValidate] = useState("");
  const [economyPriceValidateFlag, seteconomyPriceValidateFlag] = useState(false);

  const [baggageAllowanceValidate, setbaggageAllowanceValidate] = useState("");
  const [baggageAllowanceValidateFlag, setbaggageAllowanceValidateFlag] = useState(false);

  
  




  
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

  })
  
  

    const Alert = React.forwardRef(function Alert(props, ref) {
    
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open1, setOpen1] = React.useState(false);
  const paperStyle={padding:20, height:'1300px',width:600,margin:"150px auto",minheight: '1300px'}
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


  
  const onSubmit = async (event) => {
    event.preventDefault();
   
   
    
    
    var flag1=true
    var flag2=true
    var flag3=true
    var flag4=true
    var flag5=true
    var flag6=true

   setflightNumberValidateFlag(false)
   settripDurationValidateFlag(false)
    setdepTimeValidateFlag(false)
    setarrTimeValidateFlag(false)
    seteconomySeatsValidateFlag(false)
    setbusinessSeatsValidateFlag(false)
    setdepPortValidateFlag(false)
    setarrPortValidateFlag(false)
    setdepTerminalValidateFlag(false)
    setarrTerminalValidateFlag(false)
    setbusinessPriceValidateFlag(false)
    seteconomyPriceValidateFlag(false)
    setbaggageAllowanceValidateFlag(false)

    setflightNumberValidate('')
    settripDurationValidate('')
    setdepPortValidate('')
    setarrPortValidate('')
    setdepTerminalValidate('')
    setarrTerminalValidate('')
    setbusinessPriceValidate('')
    seteconomyPriceValidate('')
    setbaggageAllowanceValidate('')




    var today = new Date();
    today.setHours(0,0,0,0)
    if(values.ArrivalTime!=''){
      var arrDate = new Date(values.ArrivalTime)
      
    }
    if(values.DepartureTime!=''){
      var depDate = new Date(values.DepartureTime)
    }
    if(values.DepartureTime!='' && values.ArrivalTime!=''){
    if(depDate.getTime()<today.getTime()){
      setdepTimeValidate("Departure date has already passed")
      setdepTimeValidateFlag(true)
      flag1=false
      console.log("7sl")
    }
    else{
      flag1=true
      setdepTimeValidate("")
    }
    if(arrDate.getTime()<depDate.getTime()){
      console.log("hhh")
      setarrTimeValidate("Arrival date can`t be before departure date")
      setarrTimeValidateFlag(true)
      flag2=false
    }
    else{
      flag2=true
      setarrTimeValidate("")
    }
  }else{
    setdepTimeValidate("Departure date can't be empty")
    setdepTimeValidateFlag(true)
    setarrTimeValidate("Arrival date can't be empty")
      setarrTimeValidateFlag(true)

  }

  
 

    if(values.EconomySeatsNumber<0){
      seteconomySeatsValidate("Number of seats must be positive")
      seteconomySeatsValidateFlag(true)
      flag3=false
    }
    else{
      flag3=true
      seteconomySeatsValidate("")
    }
    if(values.BuisnessSeatsNumber<0){
      setbusinessSeatsValidate("Number of seats must be positive")
      flag4=false
      setbusinessSeatsValidateFlag(true)
    }
    else{
      flag4=true
      setbusinessSeatsValidate("")
    }
    console.log(economySeatsValidate)

    if(values.FlightNumber.length<3){
      setflightNumberValidate("Flight Number must be atleast 3 characters long")
      setflightNumberValidateFlag(true)
      flag5=false
    }

    if(values.TripDuration<=0){
      settripDurationValidate("Trip Duration must be positive")
      settripDurationValidateFlag(true)
      flag5=false
    }

    
    if(!values.ArrivalPort.charAt(0).match(/[a-z]/i)
    || !values.ArrivalPort.charAt(1).match(/[a-z]/i)|| !values.ArrivalPort.charAt(2).match(/[a-z]/i)){
      setarrPortValidate("Arrival Port must contain letters only")
      setarrPortValidateFlag(true)
      flag5=false
    }
    if(values.ArrivalPort.length!=3 ){
      setarrPortValidate("Arrival Port must be 3 letters long")
      setarrPortValidateFlag(true)
      flag5=false
    }

    if(!values.DeparturePort.charAt(0).match(/[a-z]/i)
    || !values.DeparturePort.charAt(1).match(/[a-z]/i)|| !values.DeparturePort.charAt(2).match(/[a-z]/i)){
      setdepPortValidate("Departure Port must contain letters only ")
      setdepPortValidateFlag(true)
      flag5=false
    }

    if(values.DeparturePort.length!=3){
      setdepPortValidate("Departure Port must be 3 letters long")
      setdepPortValidateFlag(true)
      flag5=false
    }

    if(values.DepartureTerminal<=0){
      setdepTerminalValidate("Departure Terminal must be positive")
      setdepTerminalValidateFlag(true)
      flag5=false
    }

    if(values.ArrivalTerminal<=0){
      setarrTerminalValidate("Arrival Terminal must be positive")
      setarrTerminalValidateFlag(true)
      flag5=false
    }

    if(values.BusinessPrice<=0){
      setbusinessPriceValidate("Business Price must be positive")
      setbusinessPriceValidateFlag(true)
      flag5=false
    }

    if(values.EconomyPrice<=0){
      seteconomyPriceValidate("Economy Price must be positive")
      seteconomyPriceValidateFlag(true)
      flag5=false
    }

    if(values.BaggageAllowance<=0){
      setbaggageAllowanceValidate("Baggae Allowance must be positive")
      setbaggageAllowanceValidateFlag(true)
      flag5=false
    }

    if(values.EconomySeatsNumber==0&&values.BuisnessSeatsNumber==0){
      seteconomySeatsValidate("Choose atleast 1 Economy or Business seat")
        seteconomySeatsValidateFlag(true)
        setbusinessSeatsValidate("Choose atleast 1 Economy or Business seat")
        setbusinessSeatsValidateFlag(true)
        flag6=false
    }


    if(flag1&&flag2&&flag3&&flag4&&flag5&&flag6){
      event.preventDefault();
      axios.post('http://localhost:150/flight/createflight', values)
        .then(function (response) {
          console.log(response);
          //setButtonSuccessPopup(true);
          handleClick1();
        })
        .catch(function (error) {
          console.log(error);
          //setButtonFailurePopup(true)
          handleClick2();
        });
    }else{
      setOpen2(true)
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
    <Container>
      
        <Grid>
        <Paper elevation={10} style={paperStyle}>
        <Grid align="center" >
            <AirplaneTicketOutlinedIcon  color="primary" style={{fontSize:"100"}}/>
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
         required 
         color="primary"
         style={{width:'200' }}
         minLength="3"
         id="FlightNumber"
         value={values.FlightNumber} onChange={set('FlightNumber')} 
         helperText={flightNumberValidate}
        error={flightNumberValidateFlag}
         
         />
         </Grid>

         <Grid item xs={6} align="center">

          <h2 style={{color:"#be8b14"}}>Trip Duration:</h2>
          <TextField
          InputProps={{
            endAdornment: <InputAdornment  position="end">mins</InputAdornment>,
          }}
          type="text"
          id="TripDuration"
          variant="standard"
          label="Trip Duration"
          placeholder="Enter Trip Duration"
          required 
          color="primary"
          style={{width:'200' }}
          required 
          value={values.TripDuration} 
          onChange={set('TripDuration')}
          helperText={tripDurationValidate}
        error={tripDurationValidateFlag}
          />
        </Grid>

        
         
         

         <Grid item xs={6}  >
        <h2 style={{color:"#be8b14"}}>Arrival Date:</h2>
         <TextField
         type="date"
         id="ArrivalTime"
         variant="standard"
         required 
         color="primary"
         style={{width:'200' }}
        required 
        value={values.ArrivalTime} onChange={set('ArrivalTime')}
        helperText={arrTimeValidate}
        error={arrTimeValidateFlag}
        
         />
         </Grid>

         <Grid item xs={6} align="center"> 
         <h2 style={{color:"#be8b14"}}>Departure Date:</h2>
         
         <TextField 
         type="date"
         id="DepartureTime"
         variant="standard"
         required 
         color="primary"
         style={{width:'200' }}
        required
        value={values.DepartureTime} onChange={set('DepartureTime')}
        helperText={depTimeValidate}
        error={depTimeValidateFlag}
         />
         </Grid>

         
         
         <Grid item xs={6}>
        <h2 style={{color:"#be8b14"}}>Business Seats:</h2>
         <TextField
         type="number"
         id="BuisnessSeatsNumber"
         label="Number of Business Seats"
         variant="standard"
         required 
         color="primary"
         style={{width:'200' }}
        required 
        alue={values.BuisnessSeatsNumber} 
        onChange={set('BuisnessSeatsNumber') }
        helperText={businessSeatsValidate}
        error={businessSeatsValidateFlag}
         />
        </Grid>

        <Grid item xs={6} align="center">
        <h2 style={{color:"#be8b14"}}>Economy Seats:</h2>
         <TextField
         type="number"
         id="EconomySeatsNumber"
         variant="standard"
         required 
         color="primary"
         style={{width:'200' }}
        required 
        label="Number of Economy Seats"
        value={values.EconomySeatsNumber}
        onChange={set('EconomySeatsNumber')}
        helperText={economySeatsValidate}
        error={economySeatsValidateFlag}
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
         required 
         color="primary"
         style={{width:'200' }}
        required 
        value={values.DeparturePort} 
        onChange={set('DeparturePort')}
        helperText={depPortValidate}
        error={depPortValidateFlag}
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
         required 
         color="primary"
         style={{width:'200' }}
        required 
        value={values.ArrivalPort} 
        onChange={set('ArrivalPort')}
        helperText={arrPortValidate}
        error={arrPortValidateFlag}
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
         required 
         color="primary"
         style={{width:'200' }}
        required 
        value={values.DepartureTerminal} 
        onChange={set('DepartureTerminal')}
        helperText={depTerminalValidate}
        error={depTerminalValidateFlag}
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
         required 
         color="primary"
         style={{width:'200' }}
        required 
        value={values.ArrivalTerminal} 
        onChange={set('ArrivalTerminal')}
        helperText={arrTerminalValidate}
        error={arrTerminalValidateFlag}
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
         required 
         color="primary"
         style={{width:'200' }}
        required 
        value={values.BusinessPrice} 
        onChange={set('BusinessPrice')}
        helperText={businessPriceValidate}
        error={businessPriceValidateFlag}
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
         required 
         color="primary"
         style={{width:'200' }}
        required 
        value={values.EconomyPrice} 
        onChange={set('EconomyPrice')}
        helperText={economyPriceValidate}
        error={economyPriceValidateFlag}
         />
         </Grid>

         <Grid item xs={6} >
        <h2 style={{color:"#be8b14"}}>Baggage Allowance:</h2>
         <TextField
         InputProps={{
          endAdornment: <InputAdornment position="end">kg</InputAdornment>,
        }}
         type="text"
         id="BaggageAllowance"
         variant="standard"
         label="Baggage Allowance"
         placeholder="Enter Baggage Allowance"
         required 
         color="primary"
         style={{width:'200' }}
        required 
        value={values.BaggageAllowance} 
        onChange={set('BaggageAllowance')}
        helperText={baggageAllowanceValidate}
        error={baggageAllowanceValidateFlag}
         />
         </Grid>

         
       

         
         
         
        
        
         </Grid>
         <br/>
        <br/>
        <br/>
        <br/>
        <Grid align="right">
         <Button margin="0" type="button"  variant="contained" style={{backgroundColor:'#bd8b13',width:'30%',height:"35%"}} onClick={(e) => { onSubmit(e) }}>Create</Button>
</Grid>
        

        

         </form>
         </Box>


          </Paper>
         
        </Grid>





      {/* <PopUp trigger={buttonSuccessPopup} setTrigger={setButtonSuccessPopup}>
        <h3>Flight created Successfully</h3>
      </PopUp>
      <PopUp trigger={buttonFailurePopup} setTrigger={setButtonFailurePopup}>
        <h3>error : flight was not created</h3>
      </PopUp> */}
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
          Flight not created!
        </Alert>
      </Snackbar>
      </Stack>

      </Container>
      </ThemeProvider>
  )
}

