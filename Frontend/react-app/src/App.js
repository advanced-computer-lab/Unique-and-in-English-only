import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Create from './createFlight'
import Search from './searchFlights'
import Home from './homePage';
import List from './listFlights';
import Update from './updateFlight';
import NotFound from './NotFound';
import SignIn from './signIn';
function App(){
  return(
    <Router>
      <div className="content">
        <Switch>
        <Route exact path="/signIn">
            <SignIn/>
            </Route>
          <Route exact path="/">
            <Home/>
            </Route>
          < Route exact path="/createFlight">
            <Create/>
          </Route>
          < Route exact path="/searchFlight">
            <Search/>
          </Route>
          < Route  path="/updateFlight/:id" >
            <Update/>
          </Route>
          < Route exact path="/listFlights">
            <List/>
          </Route>
          <Route path="*">
           <NotFound/>
          </Route>
        </Switch>
      </div>
      </Router>
  );
}
export default App ;