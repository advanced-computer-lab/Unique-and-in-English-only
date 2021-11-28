import axios from 'axios';
import { PromiseProvider } from 'mongoose';
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PopUp from './popUp.js'
import "./searchFlights.css";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';


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
      <h1>Update Flight</h1>
      <form>
        <label >Flight Number :</label><br></br>
        <Input type="text" required id="FlightNumber" value={values.FlightNumber} onChange={set('FlightNumber')}  ></Input><br></br>
        <label >Departure Time :</label><br></br>
        <Input type="text" required id="DepartureTime" value={values.DepartureTime} onChange={set('DepartureTime')}  ></Input><br></br>
        <label >Arrival Time :</label><br></br>
        <Input type="text" required id="ArrivalTime" value={values.ArrivalTime} onChange={set('ArrivalTime')} ></Input><br></br>
        <label >Economy Seats Number :</label><br></br>
        <Input type="text" required id="EconomySeatsNumber" value={values.EconomySeatsNumber} onChange={set('EconomySeatsNumber')} ></Input><br></br>
        <label >Buisness Seats Number :</label><br></br>
        <Input type="text" required id="BuisnessSeatsNumber" value={values.BuisnessSeatsNumber} onChange={set('BuisnessSeatsNumber')}  ></Input><br></br>
        <label >Departure Port : </label><br></br>
        <Input type="text" required id="DeparturePort" value={values.DeparturePort} onChange={set('DeparturePort')}  ></Input><br></br>
        <label >Arrival Port : </label><br></br>
        <Input type="text" required id="ArrivalPort" value={values.ArrivalPort} onChange={set('ArrivalPort')}  ></Input><br></br>
        <label >Departure Terminal : </label><br></br>
        <Input type="text" required id="DepartureTerminal" value={values.DepartureTerminal} onChange={set('DepartureTerminal')}  ></Input><br></br>
        <label >Arrival Terminal : </label><br></br>
        <Input type="text" required id="ArrivalTerminal" value={values.ArrivalTerminal} onChange={set('ArrivalTerminal')}  ></Input><br></br>
        <br></br>
        <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'20%'}} onClick={(e) => { onSubmit(e) }}>update</Button>
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
