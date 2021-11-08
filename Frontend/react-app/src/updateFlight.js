import axios from 'axios';
import { PromiseProvider } from 'mongoose';
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PopUp from './popUp.js'

function UpdateFlight(props) {
  let { id } = useParams();
  const [buttonSuccessPopup, setButtonSuccessPopup] = useState(false);
  const [buttonFailurePopup, setButtonFailurePopup] = useState(false);

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
  })

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
    }
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    axios.put('http://localhost:150/flight/updateFlight/' + id, values)
      .then(function (response) {
        console.log(response);
        setButtonSuccessPopup(true);
      })
      .catch(function (error) {
        console.log(error);
        setButtonFailurePopup(true)
      });
      
  }

  return (
    <div className="createflight-form">
      <a href="http://localhost:3000">home</a>
      <form>
        <label >Flight Number :</label><br></br>
        <input type="text" required id="FlightNumber" value={values.FlightNumber} onChange={set('FlightNumber')}  ></input><br></br>
        <label >Departure Time :</label><br></br>
        <input type="text" required id="DepartureTime" value={values.DepartureTime} onChange={set('DepartureTime')}  ></input><br></br>
        <label >Arrival Time :</label><br></br>
        <input type="text" required id="ArrivalTime" value={values.ArrivalTime} onChange={set('ArrivalTime')} ></input><br></br>
        <label >Economy Seats Number :</label><br></br>
        <input type="text" required id="EconomySeatsNumber" value={values.EconomySeatsNumber} onChange={set('EconomySeatsNumber')} ></input><br></br>
        <label >Buisness Seats Number :</label><br></br>
        <input type="text" required id="BuisnessSeatsNumber" value={values.BuisnessSeatsNumber} onChange={set('BuisnessSeatsNumber')}  ></input><br></br>
        <label >Departure Port : </label><br></br>
        <input type="text" required id="DeparturePort" value={values.DeparturePort} onChange={set('DeparturePort')}  ></input><br></br>
        <label >Arrival Port : </label><br></br>
        <input type="text" required id="ArrivalPort" value={values.ArrivalPort} onChange={set('ArrivalPort')}  ></input><br></br>
        <label >Departure Terminal : </label><br></br>
        <input type="text" required id="DepartureTerminal" value={values.DepartureTerminal} onChange={set('DepartureTerminal')}  ></input><br></br>
        <label >Arrival Terminal : </label><br></br>
        <input type="text" required id="ArrivalTerminal" value={values.ArrivalTerminal} onChange={set('ArrivalTerminal')}  ></input><br></br>
        <button type="button" onClick={(e) => { onSubmit(e) }}>update</button>
      </form>
      <PopUp trigger={buttonSuccessPopup} setTrigger={setButtonSuccessPopup}>
        <h3>Flight updated successfully</h3>


      </PopUp>
      <PopUp trigger={buttonFailurePopup} setTrigger={setButtonFailurePopup}>
        <h3>error : flight was not updated</h3>
      </PopUp>
    </div>
  )
}
export default UpdateFlight;
