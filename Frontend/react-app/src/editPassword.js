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
import { Link } from "react-router-dom"
import {useHistory} from "react-router-dom";

const paperStyle = { padding: 20, height: '400px', width: '500px', margin: "150px auto" }


function EditPassword(props) {
  let history=useHistory();

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
  
    const [username, setUserName] = useState('')
    const [OldPassword, setOldPassword] = useState('')
    const [NewPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [UserNameError, setUserNameError] = useState(false)
    const [OldPasswordError, setOldPasswordError] = useState(false)
    const [NewPasswordError, setNewPasswordError] = useState(false)
    const [ConfirmPasswordError, setConfirmPasswordError] = useState(false)

    const [UserNameErrorHelper, setUserNameErrorHelper] = useState('')
    const [OldPasswordErrorHelper, setOldPasswordErrorHelper] = useState('')
    const [NewPasswordErrorHelper, setNewPasswordErrorHelper] = useState('')
    const [ConfirmPasswordErrorHelper, setConfirmPasswordErrorHelper] = useState('')
   
    const [BackendValidationResponse, setBackendValidationResponse] = useState('')
  const [BackendValidationError,setBackendValidationError]=useState(false)
  

  
    
    const onSubmit = async (event) => {
      event.preventDefault();
      if(username==''){
        setUserNameError(true)
        setUserNameErrorHelper('User Name')
      }
      else{
        setUserNameError(false)
        setUserNameErrorHelper('')
      }
      if(OldPassword==''){
        setOldPasswordError(true)
        setOldPasswordErrorHelper('Old Password')
      }
      else{
        setOldPasswordError(false)
        setOldPasswordErrorHelper('')
      }
      if(NewPassword==''){
        setNewPasswordError(true)
        setNewPasswordErrorHelper('New Password')
      }
      else{
        setNewPasswordError(false)
        setNewPasswordErrorHelper('')
      }
      if(confirmPassword=='' || confirmPassword!=NewPassword){
        setConfirmPasswordError(true)
        setConfirmPasswordErrorHelper('confirm Password')
      }
      else{
        setConfirmPasswordError(false)
        setConfirmPasswordErrorHelper('')
      }
      if( !username=='' && !OldPassword=='' && !NewPassword=='' && !confirmPassword=='' && !(confirmPassword==NewPassword)){
      axios.put('http://localhost:150/user/EditPassword')
        .then(function (response) {
          console.log(response);
          if(response.data=="success"){
            setBackendValidationResponse('password changed successfully')
            setBackendValidationError(false)
          }
          else{
            setBackendValidationResponse(response.data)
            setBackendValidationError(true)
          }
          setOpen1(true)
        })
        .catch(function (error) {
          console.log(error);
          setOpen2(true)
        });
      }
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
            <TextField 
            variant="outlined" 
            label="Username" 
            required   
            onChange={(e) => setUserName(e.target.value)}
            helperText={UserNameErrorHelper}
            error={UserNameError}>
       
            </TextField>
            </Grid>

            <Grid item xs={6}>
            <TextField variant="outlined" label="Old Password" required id="LastName" 
            onChange={(e) => setOldPassword(e.target.value)}
            helperText={OldPasswordErrorHelper}
            error={OldPasswordError} ></TextField>
            </Grid>

            <Grid item xs={6}>
            <TextField  variant="outlined" label="New Password" required id="PassportNumber"
            onChange={(e) => setNewPassword(e.target.value)}
            helperText={NewPasswordErrorHelper}
            error={NewPasswordError}></TextField>
            </Grid>

            <Grid item xs={6}>
            <TextField variant="outlined" label="Confirm Password" required id="Email"
            onChange={(e) => setConfirmPassword(e.target.value)}
            helperText={ConfirmPasswordErrorHelper}
            error={ConfirmPasswordError}></TextField>
            </Grid>

            

            <Grid  item xs={12} align="right">
            <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'50%',height:'100%'}} onClick={(e) => { onSubmit(e) }}>update</Button>
            </Grid>

            </Grid>
            </Paper>

      <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
          Password Updated!
        </Alert>
      </Snackbar>
      </Stack>
      <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
          Password Not Updated!
        </Alert>
      </Snackbar>
      </Stack>
      </Grid>
      
    )
  }
  export default EditPassword;
  