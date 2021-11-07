import axios from 'axios';
import { useState } from 'react'
import { confirm } from "react-confirm-box";


function SearchFlight() {
  const [values, setValues] = useState({
    FlightNumber: '',
    DepartureTime: '',
    ArrivalTime: '',
    EconomySeatsNumber: '',
    BuisnessSeatsNumber: '',
    DeparturePort: '',
    ArrivalPort: '',
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

  return (

    <div className="container">
      <div className="searchflight-form">
        <form>
          <label >Flight Number :</label><br></br>
          <input type="text" id="FlightNumber" value={values.FlightNumber} onChange={set('FlightNumber')}  ></input><br></br>
          <label >Departure Time :</label><br></br>
          <input type="text" id="DepartureTime" value={values.DepartureTime} onChange={set('DepartureTime')}  ></input><br></br>
          <label >Arrival Time :</label><br></br>
          <input type="text" id="ArrivalTime" value={values.ArrivalTime} onChange={set('ArrivalTime')} ></input><br></br>
          <label >Economy Seats Number :</label><br></br>
          <input type="text" id="EconomySeatsNumber" value={values.EconomySeatsNumber} onChange={set('EconomySeatsNumber')} ></input><br></br>
          <label >Buisness Seats Number :</label><br></br>
          <input type="text" id="BuisnessSeatsNumber" value={values.BuisnessSeatsNumber} onChange={set('BuisnessSeatsNumber')}  ></input><br></br>
          <label >Departure Port : </label><br></br>
          <input type="text" id="DeparturePort" value={values.DeparturePort} onChange={set('DeparturePort')}  ></input><br></br>
          <label >Arrival Port : </label><br></br>
          <input type="text" id="ArrivalPort" value={values.ArrivalPort} onChange={set('ArrivalPort')}  ></input><br></br>
          <button type="button" onClick={(e) => { onSubmit(e) }}>search</button>
        </form>
      </div>

      <div id="flightsDisplay">
        {
          flight.map((f) =>
            <div className="row" key={f._id}>
              <p className="left-txt"> <b>Flight Number:{f.FlightNumber} </b> </p>
              <p className="left-txt"> <b>Departure Time:{f.DepartureTime} </b></p>
              <p className="left-txt"> <b>Arrival Time:{f.ArrivalTime} </b></p>
              <p className="left-txt"> <b>Economy Seats Number:{f.EconomySeatsNumber} </b></p>
              <p className="left-txt"> <b>Buisness Seats Number:{f.BuisnessSeatsNumber} </b></p>
              <p className="left-txt"> <b>Departure Port:{f.DeparturePort} </b></p>
              <p className="left-txt"> <b>Arrival Port:{f.ArrivalPort} </b></p>
              <button className="left-txt" onClick={(e) => { DeleteClickHandler(f) }}>  <b>Delete</b></button>
              <button className="left-txt" onClick={(e) => { UpdateClickHandler(f) }}>  <b>update</b></button>
            </div>
          )}
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
