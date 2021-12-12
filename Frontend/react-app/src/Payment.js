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
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { useEffect } from "react";







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
  console.log(false)
        useEffect(() => {
            window.scrollTo(0, 0)
          }, [])
    const classes = useStyles();
    const paperStyle={padding:20, height:'700px',width:600,margin:"150px auto",minheight: '1300px'}
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
    <Grid>
    <Paper elevation={10} style={paperStyle}>
      <Grid align="center">
      <CreditCardOutlinedIcon color="primary" style={{ fontSize: "100" }} />
        <h1 >Payment Info</h1>
      </Grid>
      <form noValidate autoComplete='off' >
        
        <Grid container spacing={1}>

          <Grid item xs={6}>
            
            <TextField
              className={classes.field}
              value={paymentInfo.Email} onChange={set('Email')} 
             // helperText={firstnameErrorHelper}
             // error={firstnameError}
              label="Email"
              variant="outlined"
              placeholder="Enter Email"
              required
              style={{ width: '100%', margin: "8px 0" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={paymentInfo.cardNum} 
              onChange={set('CardNum')}
             // helperText={lastnameErrorHelper}
              className={classes.field}
             // error={lastnameError}
              label="Card Number"
              variant="outlined"
              placeholder="Enter CN"
              required
              style={{ width: '100%', margin: "8px 0" }}
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              value={paymentInfo.cardExpDate} onChange={set('cardExpDate')}
              className={classes.field}
              label="Card Expiry Date"
              variant="outlined"
              placeholder="Enter Expiry Date"
              required S
             // error={usernameError}
             // helperText={usernameErrorHelper}
              style={{ width: '100%', margin: "8px 0" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={paymentInfo.cardCVC} onChange={set('cardCVC')}
              className={classes.field}
              label="CVC"
              variant="outlined"
              placeholder="Enter CVC"
              required S
             // error={emailError}
             // helperText={emailErrorHelper}
              style={{ width: '100%', margin: "8px 0" }}
              type="email"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              value={paymentInfo.Country} 
              onChange={set('Country') }
              className={classes.field}
              label="Country/Region"
              variant="outlined"
              placeholder="Enter Region"
              required S
             // error={passwordError}
             // helperText={passwordErrorHelper}
              style={{ width: '100%', margin: "8px 0" }}
              type='password'
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              value={paymentInfo.ZIP}
              onChange={set('ZIP')}
              label="Zip Number"
              placeholder="Enter ZIP"
              variant="outlined"
              required
              type='password'
              //error={confirmpasswordError}
             // helperText={confirmpasswordErrorHelper}
              style={{ width: '100%', margin: "8px 0" }}

            />
          </Grid>
          <Grid item xs={12} align="right" margin="auto auto">
          <Button  type="button"  variant="contained" style={{backgroundColor:'#bd8b13',width:'50%',height:"100%"}} onClick={(e) => { onSubmit(e) }}>Confirm Payment</Button>
          </Grid>


        </Grid>
      </form>
    </Paper>
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
  </Grid>
  
  )
}

