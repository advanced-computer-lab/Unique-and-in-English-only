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
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useHistory } from "react-router-dom";
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import FlightLandOutlinedIcon from '@mui/icons-material/FlightLandOutlined';
import Cookies from 'js-cookie';


//import userRouter from '../../../backEnd/routes/UserRoutes';

function FlightSelection() {
  const [flight, setFlight] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:150/flight/showReturnFlights/').then(
      (result) => {
        console.log(result);
        setFlight(result.data);

      }, []);



  }, []);

  const history = useHistory();
  const onSubmit = async (flightObj) => {
    const id = flightObj._id;
    axios.post('http://localhost:150/flight/setReturnFlightID/' + id, flightObj)
      .then(
        path()

      ).catch(function (error) {
        console.log(error);

      });

  }
  const path =()=>{
    if (Cookies.get("role")!= undefined){
      history.push("/OutgoingSeatSelection")}
      else {
        history.push("/modifiedSignIn");
      }
    }

  if (flight.length >= 1) {
    return (
      <div>
      <div align="center">
      <FlightLandOutlinedIcon color="primary" className="icon" style={{fontSize:"200"}}/>
      </div>
        <h1 className="title" style={{color:"#be8b14"}}>Choose Return Flight </h1>
       

        {flight.map((f) =>
              <FlightSelectionCard f={f} submitHandler={onSubmit} />
            )}

    
    </div>
    );
  }
  else {
    return (
      <div>
        <h1>no flights matches your search criteria</h1>
      </div>
    )
  }

}

function removeObjectFromArray(flight, flightObj) {

  return flight.filter(function (ele) {
    return ele != flightObj;
  });


}
/*<div className="row" key={f._id}>
<p className="left-txt"> <b>Flight Number:{f.FlightNumber} </b> </p>
<p className="left-txt"> <b>Departure Time:{f.DepartureTime} </b></p>
<p className="left-txt"> <b>Arrival Time:{f.ArrivalTime} </b></p>
<p className="left-txt"> <b>Economy Seats Number:{f.EconomySeatsNumber} </b></p>
<p className="left-txt"> <b>Buisness Seats Number:{f.BuisnessSeatsNumber} </b></p>
<p className="left-txt"> <b>Departure Port:{f.DeparturePort} </b></p>
<p className="left-txt"> <b>Arrival Port:{f.ArrivalPort} </b></p>
<p className="left-txt"> <b>Departure Port:{f.DepartureTerminal} </b></p>
<p className="left-txt"> <b>Arrival Port:{f.ArrivalTerminal} </b></p>
<button className="left-txt" onClick={(e) => { DeleteClickHandler(f) }}>  <b>Delete</b></button>
<button className="left-txt" onClick={(e) => { UpdateClickHandler(f) }}>  <b>update</b></button>
</div>*/


export default FlightSelection; 