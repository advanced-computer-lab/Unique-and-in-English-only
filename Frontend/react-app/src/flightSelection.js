import './App.css';
//import Navbar from './navbar';
// import Home from './home';
import { Component, useState, useEffect } from 'react';
import axios from 'axios'
import { confirm } from "react-confirm-box";
import { Link } from "react-router-dom";
import FlightDetails from './FlightDetails';
import "./listFlights.css";
import FlightSelectionCard from "./flightSelectionCard.js";
import { useHistory } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";


//import userRouter from '../../../backEnd/routes/UserRoutes';

function FlightSelection() {
  const history = useHistory();
  const [flight, setFlight] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:150/flight/showFlights/').then(
      (result) => {
        console.log(result);
        setFlight(result.data);

      });

<<<<<<< HEAD


  }, []);
=======
  }, []);

  const history = useHistory();
>>>>>>> shaarawy

  const onSubmit = async (flightObj) => {
    const id = flightObj._id;
    axios.post('http://localhost:150/flight/setFlightID/' + id, flightObj)
      .then(
        history.push("/returnFlightSelection")

      )
      .catch(function (error) {
        console.log(error);

      });

  }
  if (flight.length >= 1) {
    return (
      <div className="">
        <div className="content">
          <h1 style={{ marginTop: "100px" }} >Choose Outgoing Flight </h1>
          <br></br>

          <div className="table">

            {flight.map((f) =>
              <FlightSelectionCard f={f} submitHandler={onSubmit} />
            )}

          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="mainContainer">
        <h1>no flights matches your search criteria</h1>
      </div>
    )
  }

}





export default FlightSelection; 