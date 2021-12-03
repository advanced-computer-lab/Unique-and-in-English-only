import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@material-ui/core';
import logo from "./images/Logo.jpg";
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#bd8b13'
  }
}));

const pages = ['Book', 'Help'];
const settings = ['Profile', 'Account', 'Logout'];
function BookClickHandler() {

  // window.location.href = `/searchFlight`
  ;
}

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const classes = useStyles();
  const style = {

    background: '#bd8b13'
  };

  const goToPage = (pageName) => {
    history.push(`/${pageName}`);
  }

  return (
    <AppBar style={{ backgroundColor: 'white' }} position="fixed" top="0px" z-index="2" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href="/"><img src={logo} alt="logo" /></a>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          
          >
            LOGO
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <div className="navBarMenuItemContainer">
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu} >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </div>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} ml="60%">
            {
              <Button
                style={{ color: 'black', fontWeight: "bold", fontFamily: "Etihad Altis Medium", size: "larger" }}
                onClick={(e) => { BookClickHandler() }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Book
              </Button>
            }


            {
              <Button
                style={{ color: 'black', fontWeight: "bold", fontFamily: "Etihad Altis Medium", size: "larger" }}

                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Help
              </Button>
            }
            <Dropdown cssClass='e-caret-hide' container="body" >
              <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm" style={{}}>
                Flight
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { goToPage("listFlights") }}>List flights</Dropdown.Item>
                <Dropdown.Item onClick={() => { goToPage("createFlight") }}>Create flight</Dropdown.Item>
                <Dropdown.Item onClick={() => { goToPage("searchFlight") }}>Search Flight</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
};
export default ResponsiveAppBar;
