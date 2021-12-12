import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Create from './createFlight'
import Search from './searchFlights'
import Home from './homePage';
import List from './listFlights';
import Update from './updateFlight';
import NotFound from './NotFound';
import Footer from './Footer';
import FlightDetails from './FlightDetails';
import UserHome from "./userHome.js";
import FlightSelection from "./flightSelection.js";
import ReturnFlightSelection from "./ReturnFlightSelection";
import ResponsiveAppBar from "./ResponsiveAppBar";
import OutgoingSeatSelection from "./OutgoinSeatSelection";
import ReturnSeatSelection from "./ReturnSeatSelection";
import SummaryPage from './summaryPage';
import SignIn from './signIn';
import SignUp from './signUp';
import { useEffect } from 'react';
import ViewTickets from './ticketsView';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Avatar, createMuiTheme, FormControlLabel, ThemeProvider } from '@mui/material';
import UpdateUser from './updateUser';
import Payment from './Payment';
import scrollToTop from './scrollToTop';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#be8b14'
    },
    secondary: {
      main: '#000000'
    }
  }
})

function App() {
  useEffect(() => {
    document.title = "Unique Airlines"
  }, []);
  function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString("en-US");

  }
  return (


    <ThemeProvider theme={theme}>
      
      <Router>
      <scrollToTop/>
        <nav className="navbarcontainer">
          <ResponsiveAppBar />
        </nav>

        {/* <div className="mainContainer"> */}
        <Switch>
          <Route exact path="/">
            <UserHome />
          </Route>
          < Route exact path="/createFlight">
            <Create />
          </Route>
          < Route exact path="/summaryPage">
            <SummaryPage />
          </Route>
          < Route exact path="/searchFlight">
            <Search />
          </Route>
          < Route path="/updateFlight/:id" >
            <Update />
          </Route>
          < Route exact path="/listFlights">
            <List />
          </Route>
          < Route exact path="/flightSelection">
            <FlightSelection />
          </Route>
          < Route exact path="/OutgoingSeatSelection">
            <OutgoingSeatSelection />
          </Route>
          < Route exact path="/ReturnSeatSelection">
            <ReturnSeatSelection />
          </Route>
          < Route exact path="/returnFlightSelection">
            <ReturnFlightSelection />
          </Route>
          < Route exact path="/SignIn">
            <SignIn />
          </Route>
          < Route exact path="/viewTickets">
            <ViewTickets />
          </Route>
          < Route exact path="/updateUser">
            <UpdateUser />
          </Route>
          < Route exact path="/Payment">
            <Payment />
          </Route>
          <Route exact path="/signUp">
            <SignUp />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        {/* </div> */}
        <Footer></Footer>

      </Router>

    </ThemeProvider >
  );
}
export default App;