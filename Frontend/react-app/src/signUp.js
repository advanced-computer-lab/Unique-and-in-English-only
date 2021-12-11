import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { makeStyles } from '@mui/styles';
import { Avatar, createMuiTheme,FormControlLabel,ThemeProvider } from '@mui/material';
import { blueGrey, purple } from '@mui/material/colors';
import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { fontSize, typography } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const theme=createMuiTheme({
  palette:{
   // primary:{
     // main:'#fefefe'
   // },
    secondary:{
      main:'#000000'
  }
}
})

const useStyles=makeStyles({
   field:{
     marginTop:20,
     marginBottom:20,
     display:'block',
     
   }
})

export default function SignUp () {
    const classes=useStyles()
    const[firstname,setFirstName]=useState('')
    const[lastname,setLastName]=useState('')
    const[username,setUsermame]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[confirmpassword,setConfirmPassword]=useState('')
    const[passport,setPasport]=useState('')

    const[firstnameError,setFirstNameError]=useState(false)
    const[lastnameError,setLastNameError]=useState(false)
    const[usernameError,setUsermameError]=useState(false)
    const[emailError,setEmailError]=useState(false)
    const[passwordError,setPasswordError]=useState(false)
    const[confirmpasswordError,setConfirmPasswordError]=useState(false)
    const[passportError,setPassportError]=useState(false)

    const[firstnameErrorHelper,setFirstNameErrorHelper]=useState('')
    const[lastnameErrorHelper,setLastNameErrorHelper]=useState('')
    const[usernameErrorHelper,setUsermameErrorHelper]=useState('')
    const[emailErrorHelper,setEmailErrorHelper]=useState('')
    const[passwordErrorHelper,setPasswordErrorHelper]=useState('')
    const[confirmpasswordErrorHelper,setConfirmPasswordErrorHelper]=useState('')
    const[passportErrorHelper,setPassportErrorHelper]=useState('')

    const paperStyle={padding:20, height:'60vh',width:450,margin:"150px auto",minheight: '60vh'}
    const avatarStyle={backgroundColor:'#be8b14'}

    const handleSubmit=(e)=>{
      e.preventDefault()

      setFirstNameError(false)
      setLastNameError(false)
      setUsermameError(false)
      setEmailError(false)
      setPasswordError(false)
      setConfirmPasswordError(false)
      setPassportError(false)

      setFirstNameErrorHelper('')
      setLastNameErrorHelper('')
      setUsermameErrorHelper('')
      setEmailErrorHelper('')
      setPasswordErrorHelper('')
      setConfirmPasswordErrorHelper('')
      setPassportErrorHelper('')
      

      if(firstname==''){
        setFirstNameError(true)
        setFirstNameErrorHelper('First Name')
      }
      if(lastname==''){
        setLastNameError(true)
        setLastNameErrorHelper('Last Name')
      }
      if(passport==''){
          setPassportError(true)
          setPassportErrorHelper('Passport')
      }
      if(username==''){
          setUsermameError(true)
          setUsermameErrorHelper('Username')
      }
      if(email==''){
          setEmailError(true)
          setEmailErrorHelper('Email')
      }
      if(password==''){
          setPasswordError(true)
          setPasswordErrorHelper('Password')
      }
      if(confirmpassword==''){
        setConfirmPasswordError(true)
        setConfirmPasswordErrorHelper('Confirm Pass')
    }

      

    }
    return (
    
       
    
 
       <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
            <Avatar style={avatarStyle}><PersonOutlineOutlinedIcon/></Avatar>
           <h1>Register</h1>
            </Grid>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <Grid container spacing={1}>

        <Grid item xs={6}>
        <TextField
         className={classes.field}
         onChange={(e)=>setFirstName(e.target.value)}
         helperText={firstnameErrorHelper}
         error={firstnameError}
         label="First Name"
         variant="outlined"
         placeholder="Enter First Name"
         required
         style={{width:'100%',margin:"8px 0"}}
         />
        </Grid>
        <Grid item xs={6}>
        <TextField
        onChange={(e)=>setLastName(e.target.value)}
        helperText={lastnameErrorHelper}
         className={classes.field}
         error={lastnameError}
         label="Last Name"
         variant="outlined"
         placeholder="Enter Last Name"
         required
         style={{width:'100%',margin:"8px 0"}}
         />
        </Grid>
        <Grid item xs={6}>
        <TextField
         onChange={(e)=>setUsermame(e.target.value)}
         className={classes.field}
         label="Username"
         variant="outlined"
         placeholder="Enter Username"
         required S
         error={usernameError}
         helperText={usernameErrorHelper}
         style={{width:'100%',margin:"8px 0"}}
         />
        </Grid>
        <Grid item xs={6}>
        <TextField
         onChange={(e)=>setEmail(e.target.value)}
         className={classes.field}
         label="Email"
         variant="outlined"
         placeholder="Enter Email"
         required S
         error={emailError}
         helperText={emailErrorHelper}
         style={{width:'100%',margin:"8px 0"}}
         type="email"
         />
        </Grid>

         <Grid item xs={6}>
         <TextField
         onChange={(e)=>setPassword(e.target.value)}
         className={classes.field}
         label="Password"
         variant="outlined"
         placeholder="Enter Password"
         required S
         error={passwordError}
         helperText={passwordErrorHelper}
         style={{width:'100%',margin:"8px 0"}}
         type='password'
         />
    </Grid>

    <Grid item xs={6}>
         <TextField 
        onChange={(e)=>setConfirmPassword(e.target.value)}
         label="Confirm Password"
         placeholder="Enter Password"
         variant="outlined" 
         required
         type='password'
         error={confirmpasswordError}
         helperText={confirmpasswordErrorHelper}
         style={{width:'100%',margin:"8px 0"}}
    
         />
         </Grid>

         <Grid item xs={6}>
         <TextField 
        onChange={(e)=>setPasport(e.target.value)}
         label="Passport Number"
         placeholder="Enter Passport"
         variant="outlined" 
         required
         type='password'
         error={passportError}
         helperText={passportErrorHelper}
         style={{width:'100%',margin:"8px 0"}}
    
         />
         </Grid>
         <Button
         type="submit"
         color="primary"
         variant="contained" 
        endIcon={<KeyboardArrowRightOutlinedIcon/>}
        style={{width:'100%', fontSize:20,margin:'13px 0'}}
         >Sign Up</Button>

         
         
         </Grid>
         </form>
          </Paper>
          </Grid>
         
       

     
    );
  }
   