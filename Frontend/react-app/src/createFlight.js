import axios from 'axios';
import { useState } from 'react'
import PopUp from './popUp.js'
function CreateFlight() {
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
    ArrivalTerminal:'',
    DepartureTerminal:'',

  })

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
    }
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:150/flight/createflight', values)
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
      <a href="http://localhost:3000">back</a>
      <form>
        <label >Flight Number :</label><br></br>
        <input type="text" minLength="3" required id="FlightNumber" value={values.FlightNumber} onChange={set('FlightNumber')}  ></input><br></br>
        <label >Departure Time :</label><br></br>
        <input type="date" minLength="3" required id="DepartureTime" value={values.DepartureTime} onChange={set('DepartureTime')}  ></input><br></br>
        <label >Arrival Time :</label><br></br>
        <input type="date" minLength="3" required id="ArrivalTime" value={values.ArrivalTime} onChange={set('ArrivalTime')} ></input><br></br>
        <label >Economy Seats Number :</label><br></br>
        <input type="number" minLength="1" required id="EconomySeatsNumber" value={values.EconomySeatsNumber} onChange={set('EconomySeatsNumber')} ></input><br></br>
        <label >Buisness Seats Number :</label><br></br>
        <input type="number" minLength="1" required id="BuisnessSeatsNumber" value={values.BuisnessSeatsNumber} onChange={set('BuisnessSeatsNumber')}  ></input><br></br>
        <label >Departure Port : </label><br></br>
        <input type="text" minLength="1" required="true" id="DeparturePort" value={values.DeparturePort} onChange={set('DeparturePort')}  ></input><br></br>
        <label >Arrival Port : </label><br></br>
        <input type="text" minLength="1" required id="ArrivalPort" value={values.ArrivalPort} onChange={set('ArrivalPort')}  ></input><br></br>
        <label >Departure Terminal : </label><br></br>
        <input type="text" minLength="1" required="true" id="DepartureTerminal" value={values.DepartureTerminal} onChange={set('DepartureTerminal')}  ></input><br></br>
        <label >Arrival Terminal : </label><br></br>
        <input type="text" minLength="1" required id="ArrivalTerminal" value={values.ArrivalTerminal} onChange={set('ArrivalTerminal')}  ></input><br></br>
        <button type="button" onClick={(e) => { onSubmit(e) }}>Create</button>
      </form>
      <PopUp trigger={buttonSuccessPopup} setTrigger={setButtonSuccessPopup}>
        <h3>Flight created Successfully</h3>
      </PopUp>
      <PopUp trigger={buttonFailurePopup} setTrigger={setButtonFailurePopup}>
        <h3>error : flight was not created</h3>
      </PopUp>
    </div >
  )
}
export default CreateFlight;
