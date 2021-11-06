import './App.css';
//import Navbar from './navbar';
// import Home from './home';
import { Component, useState,useEffect } from 'react';
import axios from 'axios'
//import userRouter from '../../../backEnd/routes/UserRoutes';

function ListFlights() {
    const [flight,setFlight]=useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/flight/listFlights').then(
      (result)=>{
        setFlight(result.data)
      
    
      })

  },[]);
  function DeleteClickHandler (flightObj){
    const id = flightObj._id;
    axios.delete('http://localhost:8000/flight/deleteFlight/:'+id)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
  }
  function UpdateClickHandler (flightObj){
    const id = flightObj._id;
    axios.put('http://localhost:8000/flight/updateFlight/:'+id)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
  }
  return (
    <div className="">
      <div className="content">
          <h1>Employee Profile </h1>

          <br/>
          
            
          { flight.map((f)=>
            <div className="row" key={f._id}>
              
              <p className="left-txt"> <b>Flight Number:{f.FlightNumber} </b> </p>
              <p className="left-txt"> <b>Departure Time:{f.DepartureTime} </b></p>
              <p className="left-txt"> <b>Economy Seats Number:{f.EconomySeatsNumber} </b></p>
              <p className="left-txt"> <b>Buisness Seats Number:{f.BuisnessSeatsNumber} </b></p>
              <p className="left-txt"> <b>Departure Port:{f.DeparturePort} </b></p>
              <p className="left-txt"> <b>Arrival Port:{f.ArrivalPort} </b></p>
              <p className="left-txt"> <b>Arrival Port:{f._id} </b></p>
              <button className="left-txt" onClick={(e)=>{DeleteClickHandler(f)}}>  <b>Delete</b></button>
              <button className="left-txt" onClick={(e)=>{UpdateClickHandler(f)}}>  <b>update</b></button>

            </div>
            
          )}
          
      </div>
    </div>

  );
}

export default ListFlights;