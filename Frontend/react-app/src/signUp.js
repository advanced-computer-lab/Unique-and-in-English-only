import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { makeStyles } from '@mui/styles';
import { Avatar, createMuiTheme, FormControlLabel, ThemeProvider } from '@mui/material';
import { blueGrey, purple } from '@mui/material/colors';
import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { fontSize, typography } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useHistory } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const axios = require('axios');
const theme = createMuiTheme({
  palette: {
    // primary:{
    // main:'#fefefe'
    // },
    secondary: {
      main: '#000000'
    }
  }
})

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',

  }
})

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [username, setUsermame] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [passport, setPasport] = useState('')
  const [HomeAddress, setHomeAdress] = useState('')
  const [CountryCode, setCountryCode] = useState('')


  const [firstnameError, setFirstNameError] = useState(false)
  const [lastnameError, setLastNameError] = useState(false)
  const [usernameError, setUsermameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmpasswordError, setConfirmPasswordError] = useState(false)
  const [passportError, setPassportError] = useState(false)
  const [HomeAddressError, setHomeAddressError] = useState(false)
  const [CountryCodeError, setCountryCodeError] = useState(false)

  const [firstnameErrorHelper, setFirstNameErrorHelper] = useState('')
  const [lastnameErrorHelper, setLastNameErrorHelper] = useState('')
  const [usernameErrorHelper, setUsermameErrorHelper] = useState('')
  const [emailErrorHelper, setEmailErrorHelper] = useState('')
  const [passwordErrorHelper, setPasswordErrorHelper] = useState('')
  const [confirmpasswordErrorHelper, setConfirmPasswordErrorHelper] = useState('')
  const [passportErrorHelper, setPassportErrorHelper] = useState('')
  const [HomeAddressErrorHelper, setHomeAddressErrorHelper] = useState('')
  const [CountryCodeErrorHelper, setCountryCodeErrorHelper] = useState('')

  const [BackendValidationResponse, setBackendValidationResponse] = useState('')
  const [BackendValidationError,setBackendValidationError]=useState(false)

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
      const Alert = React.forwardRef(function Alert(props, ref) {
    
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });


  const paperStyle = { padding: 20, height: '70vh', width: 450, margin: "150px auto", minheight: '60vh' }
  const avatarStyle = { backgroundColor: '#be8b14' }

  const handleSubmit = (e) => {
    e.preventDefault()

    setUsermameError(false)
    setFirstNameError(false)
    setLastNameError(false)
    setEmailError(false)
    setPasswordError(false)
    setConfirmPasswordError(false)
    setPassportError(false)

    setUsermameErrorHelper('')
    setFirstNameErrorHelper('')
    setLastNameErrorHelper('')
    setEmailErrorHelper('')
    setPasswordErrorHelper('')
    setConfirmPasswordErrorHelper('')
    setPassportErrorHelper('')


    if (firstname == '') {
      setFirstNameError(true)
      setFirstNameErrorHelper('First Name is required')
    }
    else{
      setFirstNameError(false)
      setFirstNameErrorHelper('')
    }
    if (lastname == '') {
      setLastNameError(true)
      setLastNameErrorHelper('Last Name is required')
    }
    else{
      setLastNameError(false)
      setLastNameErrorHelper('')
    }
    if (passport == '') {
      setPassportError(true)
      setPassportErrorHelper('Passport Number is required')
    }
    else{
      setPassportError(false)
      setPassportErrorHelper('')
    }
    if (username == '') {
      setUsermameError(true)
      setUsermameErrorHelper('Username is required')
    }
    else{
      setUsermameError(false)
      setUsermameErrorHelper('')
    }
    if (email == '') {
      setEmailError(true)
      setEmailErrorHelper('Email is required')
    }
    else{
      setEmailError(false)
      setEmailErrorHelper('')
    }
    if (password == '') {
      setPasswordError(true)
      setPasswordErrorHelper('Password is required')
    }
    else{
      setPasswordError(false)
      setPasswordErrorHelper('')
    }
    if (confirmpassword == '') {
      setConfirmPasswordError(true)
      setConfirmPasswordErrorHelper('Confirm Pass is required')
    }
    else{
      setConfirmPasswordError(false)
      setConfirmPasswordErrorHelper('')
    }
    if(password!=confirmpassword){
      setConfirmPasswordError(true)
      setConfirmPasswordErrorHelper('Passwords must match')
    }
    if (HomeAddress == '') {
      setHomeAddressError(true);
      setHomeAddressErrorHelper('Home Address is required')
    }
    else{
      setHomeAddressError(false);
      setHomeAddressErrorHelper('')
    }
    if (CountryCode == '') {
      setCountryCodeError(true)
      setCountryCodeErrorHelper('Country Code is required')
    }
    else{
      setCountryCodeError(false)
      setCountryCodeErrorHelper('')
    }
    if(!firstnameError && !lastnameError && !usernameError && ! passwordError && !passportError && !confirmpasswordError && !HomeAddressError && !CountryCodeError && !emailError){
    axios.post('http://localhost:150/user/signUp', { FirstName: firstname, LastName: lastname, Email: email, Password: password, PassportNumber: passport,UserName:username,HomeAddress:HomeAddress,CountryCode:CountryCode })
      .then((res) => {
        console.log(res.data)
        if(res.data=="success"){
        setBackendValidationResponse('user created successfully')
        handleClick1();
        history.push("/SignIn");
      }
      else{
        setBackendValidationResponse(res.data)
      }
      }).catch(err => {
        console.log(err);
        
      });
    }
    handleClick2();
  }
  return (




    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}><PersonOutlineOutlinedIcon /></Avatar>
          <h1>Register</h1>
        </Grid>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <Grid container spacing={1}>
          <Grid item xs={6}>
              <TextField
                className={classes.field}
               onChange={(e) => setUsermame(e.target.value)}
               helperText={usernameErrorHelper}
               error={usernameError}
                label="Username"
                variant="outlined"
                placeholder="Enter Username"
                required
                style={{ width: '100%', margin: "5px 0" }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                className={classes.field}
                onChange={(e) => setFirstName(e.target.value)}
                helperText={firstnameErrorHelper}
                error={firstnameError}
                label="First Name"
                variant="outlined"
                placeholder="Enter First Name"
                required
                style={{ width: '100%', margin: "5px 0" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => setLastName(e.target.value)}
                helperText={lastnameErrorHelper}
                className={classes.field}
                error={lastnameError}
                label="Last Name"
                variant="outlined"
                placeholder="Enter Last Name"
                required
                style={{ width: '100%', margin: "2px 0" }}
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                className={classes.field}
                label="Email"
                variant="outlined"
                placeholder="Enter Email"
                required S
                error={emailError}
                helperText={emailErrorHelper}
                style={{ width: '100%', margin: "2px 0" }}
                type="email"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                className={classes.field}
                label="Password"
                variant="outlined"
                placeholder="Enter Password"
                required S
                error={passwordError}
                helperText={passwordErrorHelper}
                style={{ width: '100%', margin: "2px 0" }}
                type='password'
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm Password"
                placeholder="Enter Password"
                variant="outlined"
                required
                type='password'
                error={confirmpasswordError}
                helperText={confirmpasswordErrorHelper}
                style={{ width: '100%', margin: "2px 0" }}

              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                onChange={(e) => setPasport(e.target.value)}
                label="Passport Number"
                placeholder="Enter Passport"
                variant="outlined"
                required
                type='text'
                error={passportError}
                helperText={passportErrorHelper}
                style={{ width: '100%', margin: "2px 0" }}

              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => setHomeAdress(e.target.value)}
                label="Home Address"
                placeholder="Enter Home Address"
                variant="outlined"
                required
                type='text'
                error={HomeAddressError}
                helperText={HomeAddressErrorHelper}
                style={{ width: '100%', margin: "2px 0" }}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setCountryCode(e.target.value)}
                label="Country Code"
                placeholder="Enter Country Code"
                variant="outlined"
                required
                type='text'
                error={CountryCodeError}
                helperText={CountryCodeErrorHelper}
                style={{ width: '50%', margin: "2px 0" }}

              />
            </Grid>
            <Grid item xs={6}>
            Already a member? <Link to onClick={()=>{history.push('/signin')}}>Sign In!</Link>
            </Grid>
            
            <Button
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<KeyboardArrowRightOutlinedIcon />}
              style={{ width: '100%', fontSize: 20, margin: '10px 0' }}
            >Sign Up</Button>



          </Grid>
          <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
          User created!
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
        </form>
       
      </Paper>
    </Grid>

    



  );
}
