import './App.css';
//import Navbar from './navbar';
// import Home from './home';
import { Component, useState, useEffect } from 'react';
import axios from 'axios'
import { confirm } from "react-confirm-box";
import { Link } from "react-router-dom";
import FlightDiv from "./FlightDiv.js";





//import userRouter from '../../../backEnd/routes/UserRoutes';

function ListFlights() {
  const [flights, setFlight] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:150/flight/listFlights').then(
      (result) => {
        setFlight(result.data)


      }).catch(err => console.log(err))

  }, []);
  const DeleteClickHandler = async (flightObj) => {
    const id = flightObj._id;
    const result = await confirm("Are you sure to delete this flight?");
    if (result) {
      axios.delete('http://localhost:150/flight/deleteFlight/' + id)
        .then(function (response) {
          console.log(response);
          const newFlights = removeObjectFromArray(flights, flightObj);
          setFlight(newFlights);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    console.log("You click yes!");
    return;
  }

  console.log("You click No!");

  function UpdateClickHandler(flightObj) {
    const id = flightObj._id;
    window.location.href = `http://localhost:3000/updateFlight/${id}`
  }

  return (
    <div className="">
      <div className="content">
        <a href="http://localhost:3000">back</a>

        <h1>Flights </h1>

        <br />


        {flights.map((f) =>
          <FlightDiv flight={f} />
        )
        }

      </div>
    </div>

  );
}


function removeObjectFromArray(flight, flightObj) {

  return flight.filter(function (ele) {
    return ele !== flightObj;
  });


}

export default ListFlights;