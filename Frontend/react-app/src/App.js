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
import {useEffect} from 'react';
import ViewTickets from './ticketsView'
function App() {
  useEffect(() => {
    document.title = "Unique Airlines"
  }, [])
  return (
   

    <Router>
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

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      {/* </div> */}
      <Footer></Footer>

    </Router>

  );
}
export default App;