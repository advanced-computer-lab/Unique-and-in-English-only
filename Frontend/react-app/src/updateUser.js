import axios from 'axios';
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PopUp from './popUp.js'
import "./searchFlights.css";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';


function UpdateUser(props) {
    let { id } = useParams();
    const [buttonSuccessPopup, setButtonSuccessPopup] = useState(false);
    const [buttonFailurePopup, setButtonFailurePopup] = useState(false);
  
    const [values, setValues] = useState({
     FirstName:"",
     LastName:"",
     PassportNumber:"",
     Email:""
    })
  
    const set = name => {
      return ({ target: { value } }) => {
        setValues(oldValues => ({ ...oldValues, [name]: value }));
      }
    }
    const onSubmit = async (event) => {
      event.preventDefault();
      axios.put('http://localhost:150/flight/updateUser', values)
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
        <h1>Update User</h1>
        <form>
          <label > First name :</label><br></br>
          <Input type="text" required id="FlightNumber" value={values.FirstName} onChange={set('FlightNumber')}  ></Input><br></br>
          <label > Last name :</label><br></br>
          <Input type="text" required id="DepartureTime" value={values.LastName} onChange={set('DepartureTime')}  ></Input><br></br>
          <label > passport number :</label><br></br>
          <Input type="number" required id="ArrivalTime" value={values.PassportNumber} onChange={set('ArrivalTime')} ></Input><br></br>
          <label > email :</label><br></br>
          <Input type="email" required id="EconomySeatsNumber" value={values.Email} onChange={set('EconomySeatsNumber')} ></Input><br></br>
          
          <br></br>
          <Button type="button" variant="contained" style={{backgroundColor:'#bd8b13',width:'20%'}} onClick={(e) => { onSubmit(e) }}>update</Button>
        </form>
        <PopUp trigger={buttonSuccessPopup} setTrigger={setButtonSuccessPopup}>
          <h3>User updated successfully</h3>
  
  
        </PopUp>
        <PopUp trigger={buttonFailurePopup} setTrigger={setButtonFailurePopup}>
          <h3>error : User was not updated</h3>
        </PopUp>
      </div>
    )
  }
  export default UpdateUser;
  