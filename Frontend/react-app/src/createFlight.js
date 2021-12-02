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
  
  const [depTimeValidate, setdepTimeValidate] = useState("");
  const [depTimeValidateFlag, setdepTimeValidateFlag] = useState(false);

  const [arrTimeValidate, setarrTimeValidate] = useState("");
  const [arrTimeValidateFlag, setarrTimeValidateFlag] = useState(false);

  const [economySeatsValidate, seteconomySeatsValidate] = useState("");
  const [economySeatsValidateFlag, seteconomySeatsValidateFlag] = useState(false);

  const [businessSeatsValidate, setbusinessSeatsValidate] = useState("");
  const [businessSeatsValidateFlag, setbusinessSeatsValidateFlag] = useState(false);




  
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
   
    setdepTimeValidateFlag(false)
    setarrTimeValidateFlag(false)
    seteconomySeatsValidateFlag(false)
    setbusinessSeatsValidateFlag(false)
    
    

    var today = new Date();
    today.setHours(0,0,0,0)
    if(values.ArrivalTime!=''){
      var arrDate = new Date(values.ArrivalTime)
      
    }
    if(values.DepartureTime!=''){
      var depDate = new Date(values.DepartureTime)
    }
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
      setarrTimeValidate("arrival date can`t be before departure date")
      setarrTimeValidateFlag(true)
      flag2=false
    }
    else{
      flag2=true
      setarrTimeValidate("")
    }
    if(values.EconomySeatsNumber<0){
      seteconomySeatsValidate("number of seats can`t be negative")
      seteconomySeatsValidateFlag(true)
      flag3=false
    }
    else{
      flag3=true
      seteconomySeatsValidate("")
    }
    if(values.BuisnessSeatsNumber<0){
      setbusinessSeatsValidate("number of seats can`t be negative")
      flag4=false
      setbusinessSeatsValidateFlag(true)
    }
    else{
      flag4=true
      setbusinessSeatsValidate("")
    }
    console.log(economySeatsValidate)
    if(flag1&&flag2&&flag3&&flag4){
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
         
         />
         </Grid>

         <Grid item xs={6} align="center">

          <h2 style={{color:"#be8b14"}}>Trip Duration:</h2>
          <TextField
          type="text"
          id="ArrivalTerminal"
          variant="standard"
          label="Arrival Terminal"
          placeholder="Enter arrival Terminal"
          required 
          color="primary"
          style={{width:'200' }}
          required 
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
         <h2 style={{color:"#be8b14"}}>Departure Time:</h2>
         
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
        label="Number of Economey Seats"
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
         />
         </Grid>

         <Grid item xs={6} align="center">
        <h2 style={{color:"#be8b14"}}>Arrival Terminal:</h2>
         <TextField
         type="text"
         id="ArrivalTerminal"
         variant="standard"
         label="Arrival Terminal"
         placeholder="Enter arrival Terminal"
         required 
         color="primary"
         style={{width:'200' }}
        required 
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
         label="Arrival Terminal"
         placeholder="Enter arrival Terminal"
         required 
         color="primary"
         style={{width:'200' }}
        required 
        value={values.BusinessPrice} 
        onChange={set('BusinessPrice')}
         />
         </Grid>

         <Grid item xs={6} align="center">
        <h2 style={{color:"#be8b14"}}>Economy Price:</h2>
         <TextField
         type="text"
         id="ArrivalTerminal"
         variant="standard"
         label="Arrival Terminal"
         placeholder="Enter arrival Terminal"
         required 
         color="primary"
         style={{width:'200' }}
        required 
        value={values.EconomyPrice} 
        onChange={set('EconomyPrice')}
         />
         </Grid>

         <Grid item xs={6} >
        <h2 style={{color:"#be8b14"}}>Baggage Allowance:</h2>
         <TextField
         type="text"
         id="ArrivalTerminal"
         variant="standard"
         label="Arrival Terminal"
         placeholder="Enter arrival Terminal"
         required 
         color="primary"
         style={{width:'200' }}
        required 
        value={values.BaggageAllowance} 
        onChange={set('BaggageAllowance')}
         />
         </Grid>

         
       

         
         
         
        
        
         </Grid>
         <br/>
        <br/>
        <br/>
        <br/>
         <Button margin="5" type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'100%',display:'block'}} onClick={(e) => { onSubmit(e) }}>Create</Button>

        

        

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
          There is an error!
        </Alert>
      </Snackbar>
      </Stack>

      </Container>
      </ThemeProvider>
  )
}

