import { Link } from "react-router-dom"
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
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


const NotFound = () => {
  return (
    <ThemeProvider theme={theme}>
    
    <div align="center" className="not-found" style={{margin:"150px auto"}}>
      <SmartToyOutlinedIcon color="primary" style={{fontSize:"200"}}/>
      <h2>ERROR404: Page not found</h2>
      <p>This page doesn't exist on our site, make sure you typed the correct url</p>
      <a href="/">Back to the homepage...</a>
    </div>
    </ThemeProvider>
  );
}
 
export default NotFound;