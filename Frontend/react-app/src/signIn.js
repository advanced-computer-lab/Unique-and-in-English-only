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
import { useHistory } from 'react-router-dom'

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

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsermame] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsermameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const paperStyle = { padding: 20, height: '60vh', width: 400, margin: "150px auto", minheight: '60vh' }
  const avatarStyle = { backgroundColor: '#be8b14' }

  const handleSubmit = (e) => {
    e.preventDefault()

    setPasswordError(false)
    setUsermameError(false)

    if (password == '') {
      setPasswordError(true)
    }
    if (username == '') {
      setUsermameError(true)
    }

    if (username && password) {
      console.log(username, password)
    }


    axios.post('http://localhost:150/user/signIn', { Email: username, Password: password })
      .then((response) => {
        if (response.data.error) {
          // console.log(response.error);
          ;
        }
        else {
          console.log(response);
          history.push("");
        }
      }).catch((error) => {
        console.log(error)
      });
  }
  return (


    <Container>

      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
            <h1>Sign in</h1>
          </Grid>

          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => setUsermame(e.target.value)}
              className={classes.field}
              label="Username"
              variant="outlined"
              placeholder="Enter Username"
              required S
              error={usernameError}
              style={{ width: '100%', margin: "8px 0" }}
            />

            <TextField
              onChange={(e) => setPassword(e.target.value)}
              className={classes.field}
              label="Password"
              placeholder="Enter Password"
              variant="outlined"
              required
              type='password'
              error={passwordError}
              style={{ width: '100%', margin: "8px 0" }}

            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                />
              }
              label="Remember Me"
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<KeyboardArrowRightOutlinedIcon />}
              style={{ width: '100%', fontSize: 20, margin: '8px 0' }}
            >Sign In</Button>

            <typography>
              <Link href="">Forgot Password</Link>
            </typography>
            <br />
            <typography>Not a member yet?
         <Link href=""> Sign Up!</Link>
            </typography>

          </form>
        </Paper>
      </Grid>
    </Container>



  );
}
