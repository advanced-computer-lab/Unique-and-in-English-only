import axios from 'axios';
import {useState} from 'react'
function CreateFlight(){
    const [values,setValues]= useState({FlightNumber: '',
        DepartureTime: '',
        ArrivalTime: '',
        EconomySeatsNumber: '',
        BuisnessSeatsNumber: '',
        DeparturePort: '',
        ArrivalPort: '',})
  
        const set = name => {
            return ({ target: { value } }) => {
              setValues(oldValues => ({...oldValues, [name]: value }));
            }
        }
    const onSubmit = async (event) => {
        event.preventDefault();
        axios.post('http://localhost:150/flight/createflight', values)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  
  return (
    <div className="createflight-form">
    <form>
    <label >Flight Number :</label><br></br>
    <input type="text" required id="FlightNumber" value={values.FlightNumber} onChange={set('FlightNumber')}  ></input><br></br>
    <label >Departure Time :</label><br></br>
    <input type="text" required id="DepartureTime" value={values.DepartureTime} onChange={set('DepartureTime')}  ></input><br></br>
    <label >Arrival Time :</label><br></br>
    <input type="text" required id="ArrivalTime"  value={values.ArrivalTime} onChange={set('ArrivalTime')} ></input><br></br>
    <label >Economy Seats Number :</label><br></br>
    <input type="text" required id="EconomySeatsNumber" value={values.EconomySeatsNumber} onChange={set('EconomySeatsNumber')} ></input><br></br>
    <label >Buisness Seats Number :</label><br></br>
    <input type="text" required id="BuisnessSeatsNumber" value={values.BuisnessSeatsNumber} onChange={set('BuisnessSeatsNumber')}  ></input><br></br>
    <label >Departure Port : </label><br></br>
    <input type="text" required id="DeparturePort" value={values.DeparturePort} onChange={set('DeparturePort')}  ></input><br></br>
    <label >Arrival Port : </label><br></br>
    <input type="text" required id="ArrivalPort" value={values.ArrivalPort} onChange={set('ArrivalPort')}  ></input><br></br>
    <button type="button" onClick={(e)=>{onSubmit(e)}}>Create</button>
</form>
</div>
  )
}
export default CreateFlight;
