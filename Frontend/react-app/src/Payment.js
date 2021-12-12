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

export default function Payment() {
    const classes = useStyles();
    const paperStyle={padding:20, height:'1300px',width:600,margin:"150px auto",minheight: '1300px'}
    const Alert = React.forwardRef(function Alert(props, ref) {
    
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
    const [paymentInfo, setPaymentInfo] = useState({
        Email:'',
        cardNum:'',
        cardExpDate:'',
        cardCVC:'',
        Country:'',
        ZIP:'',
    
      })

      const set = name => {
        return ({ target: { value } }) => {
          setPaymentInfo(oldValues => ({ ...oldValues, [name]: value }));
        }
      }
      const onSubmit = async (event) => {}
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
        <h2 style={{color:"#be8b14"}}>Email:</h2>
         <TextField
         
         label="Email"
         variant="standard"
         placeholder="Enter Email"
         required 
         color="primary"
         style={{width:'200' }}
         minLength="3"
         id="FlightNumber"
         value={paymentInfo.Email} onChange={set('Email')} 
         //helperText={flightNumberValidate}
        //error={flightNumberValidateFlag}
         
         />
         </Grid>

         <Grid item xs={6} align="center">

          <h2 style={{color:"#be8b14"}}>Card Number:</h2>
          <TextField
          InputProps={{
            endAdornment: <InputAdornment  position="end"></InputAdornment>,
          }}
          type="text"
          id="CardNumber"
          variant="standard"
          label="Card Number"
          placeholder="Enter Card Number"
          required 
          color="primary"
          style={{width:'200' }}
          required 
          value={paymentInfo.cardNum} 
          onChange={set('CardNum')}
          //helperText={tripDurationValidate}
        //error={tripDurationValidateFlag}
          />
        </Grid>

        
         
         

         <Grid item xs={6}  >
        <h2 style={{color:"#be8b14"}}>Card Expiry Date:</h2>
         <TextField
         type="date"
         id="CardExpiryDate"
         variant="standard"
         required 
         color="primary"
         style={{width:'200' }}
        required 
        value={paymentInfo.cardExpDate} onChange={set('cardExpDate')}
        //helperText={arrTimeValidate}
        //error={arrTimeValidateFlag}
        
         />
         </Grid>

         <Grid item xs={6} align="center"> 
         <h2 style={{color:"#be8b14"}}>Card CVC:</h2>
         
         <TextField 
         type="number"
         id="DepartureTime"
         variant="standard"
         label="Card CVC"
          placeholder="Enter Card CVC"
          required
         required 
         color="primary"
         style={{width:'200' }}
        required
        value={paymentInfo.cardCVC} onChange={set('cardCVC')}
        //helperText={depTimeValidate}
        //error={depTimeValidateFlag}
         />
         </Grid>

         
         
         <Grid item xs={6}>
        <h2 style={{color:"#be8b14"}}>Country/Region:</h2>
         <TextField
         type="number"
         id="BuisnessSeatsNumber"
         label="Country/Region"
         variant="standard"
         required 
         color="primary"
         style={{width:'200' }}
        required 
        value={paymentInfo.Country} 
        onChange={set('Country') }
        //helperText={businessSeatsValidate}
        //error={businessSeatsValidateFlag}
         />
        </Grid>

        <Grid item xs={6} align="center">
        <h2 style={{color:"#be8b14"}}>ZIP:</h2>
         <TextField
         type="number"
         id="ZIP"
         variant="standard"
         required 
         color="primary"
         style={{width:'200' }}
        required 
        label="ZIP"
        value={paymentInfo.ZIP}
        onChange={set('ZIP')}
        //helperText={economySeatsValidate}
        //error={economySeatsValidateFlag}
         />
         </Grid>


        
        
         </Grid>
         <br/>
        <br/>
        <br/>
        <br/>
        <Grid align="right">
         <Button margin="0" type="button"  variant="contained" style={{backgroundColor:'#bd8b13',width:'30%',height:"35%"}} onClick={(e) => { onSubmit(e) }}>Confirm Payment</Button>
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
      
      <Snackbar /*open={open1}*/ autoHideDuration={6000} /*onClose={handleClose1}*/>
        <Alert /*onClose={handleClose1}*/ severity="success" sx={{ width: '100%' }}>
          The flight is created!
        </Alert>
      </Snackbar>
      </Stack>
      <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar /*open={open2}*/ autoHideDuration={6000} /*onClose={handleClose2}*/>
        <Alert /*onClose={handleClose2}*/ severity="error" sx={{ width: '100%' }}>
          Flight not created!
        </Alert>
      </Snackbar>
      </Stack>

      </Container>
      </ThemeProvider>
  )
}

