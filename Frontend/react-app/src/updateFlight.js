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
  const [flag,setFlag] =useState(true)
  const  formatDate=( d)=> {
    var month=""
    var day =""
    var year=""
    year = d.getFullYear()
    month = d.getMonth()
    day= d.getDate()
   var l1=month.toString().length
   var l2=day.toString().length
   if(l1<2){
     month='0'+month
   }
    
   if(l2<2){
     day='0'+day
   }  
   return year+'-'+month+'-'+day 
  }
  var startValues={FlightNumber: '',
    DepartureTime: '',
    ArrivalTime: '',
    EconomySeatsNumber: '',
    BuisnessSeatsNumber: '',
    DeparturePort: '',
    ArrivalPort: '',
    DepartureTerminal: '',
    ArrivalTerminal: '',}
    
    if(flag){
          axios.get('http://localhost:150/flight/getFlightById/' + id)
          .then(function (response) {
          
            startValues=response.data
          
            var d1=new Date(startValues.DepartureTime)
            
            var d2=new Date(startValues.ArrivalTime)
            
            setValues({FlightNumber: startValues.FlightNumber,
              DepartureTime: formatDate(d1),
              ArrivalTime: formatDate(d2),
              EconomySeatsNumber: startValues.EconomySeatsNumber,
              BuisnessSeatsNumber: startValues.BuisnessSeatsNumber,
              DeparturePort: startValues.DeparturePort,
              ArrivalPort: startValues.ArrivalPort,
              DepartureTerminal: startValues.DepartureTerminal,
              ArrivalTerminal: startValues.ArrivalTerminal,})
              setFlag(false)
          })
          .catch(function (error) {
            console.log(error);
            setFlag(false)
          });
    }
    
  const [buttonSuccessPopup, setButtonSuccessPopup] = useState(false);
  const [buttonFailurePopup, setButtonFailurePopup] = useState(false);

  

  const [depTimeValidate, setdepTimeValidate] = useState("");
  const [arrTimeValidate, setarrTimeValidate] = useState("");
  const [economySeatsValidate, seteconomySeatsValidate] = useState("");
  const [businessSeatsValidate, setbusinessSeatsValidate] = useState("");

  const [values, setValues] = useState({
    FlightNumber: startValues.FlightNumber,
    DepartureTime: startValues.DepartureTime,
    ArrivalTime: startValues.ArrivalTime,
    EconomySeatsNumber: startValues.EconomySeatsNumber,
    BuisnessSeatsNumber: startValues.BuisnessSeatsNumber,
    DeparturePort: startValues.DeparturePort,
    ArrivalPort: startValues.ArrivalPort,
    DepartureTerminal: startValues.DepartureTerminal,
    ArrivalTerminal: startValues.ArrivalTerminal,
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
    if(values.DepartureTime!='' && depDate.getTime()<today.getTime()){
      setdepTimeValidate("Departure date has already passed")
      flag1=false
    }
    else{
      flag1=true
      setdepTimeValidate("")
    }
    if(values.DepartureTime!='' && values.ArrivalTime!='' && arrDate.getTime()<depDate.getTime()){
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
    if(flag1&&flag2&&flag3&&flag4){
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
  }
  
  return (
    <div className="createflight-form">
      <h1>update Flight</h1>
      <form>
        <label >Flight Number :</label><br></br>
        <Input  type="text" minLength="3"  id="FlightNumber" value={values.FlightNumber} onChange={set('FlightNumber')}  ></Input><br></br>
        <label >Departure Time :</label><br></br>
        <p></p>
        <Input  type="date" minLength="3"  id="DepartureTime" value={values.DepartureTime} onChange={set('DepartureTime')}  ></Input><br></br>
        <p className="form-errors">{depTimeValidate}</p>
        <label >Arrival Time :</label><br></br>
        <Input  type="date" minLength="3"  id="ArrivalTime" value={values.ArrivalTime} onChange={set('ArrivalTime')} ></Input><br></br>
        <p className="form-errors">{arrTimeValidate}</p>
        <label >Economy Seats Number :</label><br></br>
        <Input  type="number" minLength="1"  id="EconomySeatsNumber" value={values.EconomySeatsNumber} onChange={set('EconomySeatsNumber')} ></Input><br></br>
        <p className="form-errors">{economySeatsValidate}</p>
        <label >Buisness Seats Number :</label><br></br>
        <Input  type="number" minLength="1" id="BuisnessSeatsNumber" value={values.BuisnessSeatsNumber} onChange={set('BuisnessSeatsNumber') }  ></Input><br></br>
        <p className="form-errors">{businessSeatsValidate}</p>
        <label >Departure Port : </label><br></br>
        <Input  type="text" minLength="1"  id="DeparturePort" value={values.DeparturePort} onChange={set('DeparturePort')}  ></Input><br></br>
        <p></p>
        <label >Arrival Port : </label><br></br>
        <Input  type="text" minLength="1"  id="ArrivalPort" value={values.ArrivalPort} onChange={set('ArrivalPort')}  ></Input><br></br>
        <p></p>
        <label >Departure Terminal : </label><br></br>
        <Input  type="text" minLength="1"  id="DepartureTerminal" value={values.DepartureTerminal} onChange={set('DepartureTerminal')}  ></Input><br></br>
        <p></p>
        <label >Arrival Terminal : </label><br></br>
        <Input  type="text" minLength="1"  id="ArrivalTerminal" value={values.ArrivalTerminal} onChange={set('ArrivalTerminal')}  ></Input><br></br>
        <br></br>
        <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'20%'}} onClick={(e) => { onSubmit(e) }}>Update</Button>
      </form>
      <PopUp trigger={buttonSuccessPopup} setTrigger={setButtonSuccessPopup}>
        <h3>Flight updated Successfully</h3>
      </PopUp>
      <PopUp trigger={buttonFailurePopup} setTrigger={setButtonFailurePopup}>
        <h3>error : flight was not updated</h3>
      </PopUp>
    </div >
  )
}
export default UpdateFlight;
