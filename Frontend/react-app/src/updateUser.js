import axios from 'axios';
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PopUp from './popUp.js'
import "./searchFlights.css";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';

const paperStyle = { padding: 20, height: '400px', width: '500px', margin: "150px auto" }


function UpdateUser(props) {

  const [open1, setOpen1] = React.useState(false);
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
    
    const [buttonSuccessPopup, setButtonSuccessPopup] = useState(false);
    const [buttonFailurePopup, setButtonFailurePopup] = useState(false);
    const [flag,setFlag] =useState(true)
    var startValues={
    FirstName:'',
    LastName:'',
    PassportNumber:'',
    Email:''
    }

    if(flag){
      axios.get('http://localhost:150/flight/getUserById')
      .then(function (response) {
      
        startValues=response.data
        
        setValues({
        FirstName:startValues.FirstName,
        LastName:startValues.LastName,
        PassportNumber:startValues.PassportNumber,
        Email:startValues.Email

        })
          setFlag(false)
      })
      .catch(function (error) {
        console.log(error);
        setFlag(false)
      });
}
  
    const [values, setValues] = useState({
     FirstName:startValues.FirstName,
     LastName:startValues.LastName,
     PassportNumber:startValues.LastName,
     Email:startValues.Email
    })

  
    const set = name => {
      return ({ target: { value } }) => {
        setValues(oldValues => ({ ...oldValues, [name]: value }));
      }
    }
    const onSubmit = async (event) => {
      event.preventDefault();
      axios.put('http://localhost:150/flight/updateUser', values)
        .then(function (response) {
          console.log(response);
          setOpen1(true)
        })
        .catch(function (error) {
          console.log(error);
          setOpen2(true)
        });
        
    }
    const Alert = React.forwardRef(function Alert(props, ref) {
    
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
  
    return (
      <Grid align="center" >
          <Paper elevation={10} style={paperStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
            <UpdateOutlinedIcon  color="primary" style={{fontSize:"100"}}/>
            </Grid>

            <Grid item xs={6}>
            <TextField variant="outlined" label="First Name" required id="FirstName" value={values.FirstName} onChange={set('FirstName')}  ></TextField>
            </Grid>

            <Grid item xs={6}>
            <TextField variant="outlined" label="Last Name" required id="LastName" value={values.LastName} onChange={set('LastName')}  ></TextField>
            </Grid>

            <Grid item xs={6}>
            <TextField type="number" variant="outlined" label="Passport Number" required id="PassportNumber" value={values.PassportNumber} onChange={set('PassportNumber')}></TextField>
            </Grid>

            <Grid item xs={6}>
            <TextField variant="outlined" label="Email" required id="Email" value={values.Email} onChange={set('Email')}></TextField>
            </Grid>

            <Grid margin="12px" item xs={12} align="right">
            <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'40%',height:'100%'}} onClick={(e) => { onSubmit(e) }}>update</Button>
            </Grid>

            </Grid>
            </Paper>

      <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
          User updated!
        </Alert>
      </Snackbar>
      </Stack>
      <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
          User not updated!
        </Alert>
      </Snackbar>
      </Stack>
      </Grid>
      
    )
  }
  export default UpdateUser;
  