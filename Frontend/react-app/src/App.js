import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Create from './createFlight'
import Search from './searchFlights'
import Home from './homePage';
import List from './listFlights';


function App(){
  return(
    <Router>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home/>
            </Route>
          < Route exact path="/createFlight">
            <Create/>
          </Route>
          < Route exact path="/searchFlight">
            <Search/>
          </Route>
          < Route exact path="/listFlights">
            <List/>
          </Route>
        </Switch>
      </div>
      </Router>
  );
}
export default App ;