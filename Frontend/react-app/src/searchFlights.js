import axios from 'axios';
import { useState } from 'react'
import { confirm } from "react-confirm-box";
import FlightDetails from './FlightDetails';
import "./searchFlights.css";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';


function SearchFlight() {
  const [values, setValues] = useState({
    FlightNumber: '',
    DepartureTime: '',
    ArrivalTime: '',
    EconomySeatsNumber: '',
    BuisnessSeatsNumber: '',
    DeparturePort: '',
    ArrivalPort: '',
    DepartureTerminal: '',
    ArrivalTerminal: '',
  });

  const [flight, setFlight] = useState([]);

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
    }
  }
  const DeleteClickHandler = async (flightObj) => {
    const id = flightObj._id;
    const result = await confirm("Are you sure to delete this flight?");
    if (result) {
      axios.delete('http://localhost:150/flight/deleteFlight/' + id)
        .then(function (response) {
          console.log(response);
          const newFlights = removeObjectFromArray(flight, flightObj);
          setFlight(newFlights);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    console.log("You click yes!");
    return;
  }



  function UpdateClickHandler(flightObj) {
    const id = flightObj._id;
    window.location.href = `http://localhost:3000/updateFlight/${id}`
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post('http://localhost:150/flight/searchFlight', values, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    })
      .then(function (result) {
        setFlight(result.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (<div>
    <h1 style={{margin:"20px"}}>    Search Flights</h1>
    <div className="container1">
     
      <div className="searchflight-form">
     
        <form>
          <label >Flight Number </label><br></br>
          <Input label="Flight Number"  type="text" id="FlightNumber" value={values.FlightNumber} onChange={set('FlightNumber')}  ></Input><br></br>
          <label >Departure Time </label><br></br>
          <Input type="text" id="DepartureTime" value={values.DepartureTime} onChange={set('DepartureTime')}  ></Input><br></br>
          <label >Arrival Time </label><br></br>
          <Input type="text" id="ArrivalTime" value={values.ArrivalTime} onChange={set('ArrivalTime')} ></Input><br></br>
          <label >Economy Seats Number </label><br></br>
          <Input type="text" id="EconomySeatsNumber" value={values.EconomySeatsNumber} onChange={set('EconomySeatsNumber')} ></Input><br></br>
          <label >Buisness Seats Number </label><br></br>
          <Input type="text" id="BuisnessSeatsNumber" value={values.BuisnessSeatsNumber} onChange={set('BuisnessSeatsNumber')}  ></Input><br></br>
          <label >Departure Port  </label><br></br>
          <Input type="text" id="DeparturePort" value={values.DeparturePort} onChange={set('DeparturePort')}  ></Input><br></br>
          <label >Arrival Port </label><br></br>
          <Input type="text" id="ArrivalPort" value={values.ArrivalPort} onChange={set('ArrivalPort')}  ></Input><br></br>
          <label >Departure Terminal  </label><br></br>
          <Input type="text" id="DepartureTerminal" value={values.DepartureTerminal} onChange={set('DepartureTerminal')}  ></Input><br></br>
          <label >Arrival Port </label><br></br>
          <Input type="text" id="ArrivalTerminal" value={values.ArrivalTerminal} onChange={set('ArrivalTerminal')}  ></Input><br></br>
          <br></br>
          <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13'}} onClick={(e) => { onSubmit(e) }}>search</Button>
        </form>
      </div>
      <div className="results">
      <h2>Search Results</h2>
      <div id="flightsDisplay">
        
        {
          flight.map((f) =>
          <FlightDetails f={f} />
          )}
      </div>
      </div>
 </div>
    </div>
  )
}

function removeObjectFromArray(flight, flightObj) {

  return flight.filter(function (ele) {
    return ele != flightObj;
  });
}
export default SearchFlight;
