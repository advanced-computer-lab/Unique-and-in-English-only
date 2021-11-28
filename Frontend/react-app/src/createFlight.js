import axios from 'axios';
import { useState } from 'react'
import PopUp from './popUp.js'
import "./searchFlights.css";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
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
      <h1>Create Flight</h1>
      <form>
        <label >Flight Number :</label><br></br>
        <Input type="text" minLength="3" required id="FlightNumber" value={values.FlightNumber} onChange={set('FlightNumber')}  ></Input><br></br>
        <label >Departure Time :</label><br></br>
        <Input type="date" minLength="3" required id="DepartureTime" value={values.DepartureTime} onChange={set('DepartureTime')}  ></Input><br></br>
        <label >Arrival Time :</label><br></br>
        <Input type="date" minLength="3" required id="ArrivalTime" value={values.ArrivalTime} onChange={set('ArrivalTime')} ></Input><br></br>
        <label >Economy Seats Number :</label><br></br>
        <Input type="number" minLength="1" required id="EconomySeatsNumber" value={values.EconomySeatsNumber} onChange={set('EconomySeatsNumber')} ></Input><br></br>
        <label >Buisness Seats Number :</label><br></br>
        <Input type="number" minLength="1" required id="BuisnessSeatsNumber" value={values.BuisnessSeatsNumber} onChange={set('BuisnessSeatsNumber')}  ></Input><br></br>
        <label >Departure Port : </label><br></br>
        <Input type="text" minLength="1" required="true" id="DeparturePort" value={values.DeparturePort} onChange={set('DeparturePort')}  ></Input><br></br>
        <label >Arrival Port : </label><br></br>
        <Input type="text" minLength="1" required id="ArrivalPort" value={values.ArrivalPort} onChange={set('ArrivalPort')}  ></Input><br></br>
        <label >Departure Terminal : </label><br></br>
        <Input type="text" minLength="1" required="true" id="DepartureTerminal" value={values.DepartureTerminal} onChange={set('DepartureTerminal')}  ></Input><br></br>
        <label >Arrival Terminal : </label><br></br>
        <Input type="text" minLength="1" required id="ArrivalTerminal" value={values.ArrivalTerminal} onChange={set('ArrivalTerminal')}  ></Input><br></br>
        <br></br>
        <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'20%'}} onClick={(e) => { onSubmit(e) }}>Create</Button>
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
