import axios from 'axios';
import { useState } from 'react'
import PopUp from './popUp.js'
import "./searchFlights.css";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
function CreateFlight() {
  const [buttonSuccessPopup, setButtonSuccessPopup] = useState(false);
  const [buttonFailurePopup, setButtonFailurePopup] = useState(false);
  
  const [depTimeValidate, setdepTimeValidate] = useState("");
  const [arrTimeValidate, setarrTimeValidate] = useState("");
  const [economySeatsValidate, seteconomySeatsValidate] = useState("");
  const [businessSeatsValidate, setbusinessSeatsValidate] = useState("");
  
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
    
    
    var flag1=true
    var flag2=true
    var flag3=true
    var flag4=true
   

    var today = new Date();
    today.setHours(0,0,0,0)
    if(values.ArrivalTime!=''){
      var arrDate = new Date(values.ArrivalTime)
      
    }
    if(values.DepartureTime!=''){
      var depDate = new Date(values.DepartureTime)
    }
    if(depDate.getTime()<today.getTime()){
      setdepTimeValidate("Departure date has already passed")
      flag1=false
      console.log("7sl")
    }
    else{
      flag1=true
      setdepTimeValidate("")
    }
    if(arrDate.getTime()<depDate.getTime()){
      console.log("hhh")
      setarrTimeValidate("arrival date can`t be before departure date")
      flag2=false
    }
    else{
      flag2=true
      setarrTimeValidate("")
    }
    if(values.EconomySeatsNumber<0){
      seteconomySeatsValidate("number of seats can`t be negative")
      flag3=false
    }
    else{
      flag3=true
      seteconomySeatsValidate("")
    }
    if(values.BuisnessSeatsNumber<0){
      setbusinessSeatsValidate("number of seats can`t be negative")
      flag4=false
    }
    else{
      flag4=true
      setbusinessSeatsValidate("")
    }
    console.log(economySeatsValidate)
    if(flag1&&flag2&&flag3&&flag4){
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
  }
  
  return (
    <div className="createflight-form">
      <h1>Create Flight</h1>
      <form>
        <label >Flight Number :</label><br></br>
        <Input type="text" minLength="3" required id="FlightNumber" value={values.FlightNumber} onChange={set('FlightNumber')}  ></Input><br></br>
        <label >Departure Time :</label><br></br>
        <p></p>
        <Input type="date" minLength="3" required id="DepartureTime" value={values.DepartureTime} onChange={set('DepartureTime')}  ></Input><br></br>
        <p className="form-errors">{depTimeValidate}</p>
        <label >Arrival Time :</label><br></br>
        <Input type="date" minLength="3" required id="ArrivalTime" value={values.ArrivalTime} onChange={set('ArrivalTime')} ></Input><br></br>
        <p className="form-errors">{arrTimeValidate}</p>
        <label >Economy Seats Number :</label><br></br>
        <Input type="number" minLength="1" required id="EconomySeatsNumber" value={values.EconomySeatsNumber} onChange={set('EconomySeatsNumber')} ></Input><br></br>
        <p className="form-errors">{economySeatsValidate}</p>
        <label >Buisness Seats Number :</label><br></br>
        <Input type="number" minLength="1" required id="BuisnessSeatsNumber" value={values.BuisnessSeatsNumber} onChange={set('BuisnessSeatsNumber') }  ></Input><br></br>
        <p className="form-errors">{businessSeatsValidate}</p>
        <label >Departure Port : </label><br></br>
        <Input type="text" minLength="1" required="true" id="DeparturePort" value={values.DeparturePort} onChange={set('DeparturePort')}  ></Input><br></br>
        <p></p>
        <label >Arrival Port : </label><br></br>
        <Input type="text" minLength="1" required id="ArrivalPort" value={values.ArrivalPort} onChange={set('ArrivalPort')}  ></Input><br></br>
        <p></p>
        <label >Departure Terminal : </label><br></br>
        <Input type="text" minLength="1" required="true" id="DepartureTerminal" value={values.DepartureTerminal} onChange={set('DepartureTerminal')}  ></Input><br></br>
        <p></p>
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
