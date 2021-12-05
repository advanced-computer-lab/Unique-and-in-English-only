import axios from 'axios';
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PopUp from './popUp.js'
import "./searchFlights.css";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';


function UpdateUser(props) {
    
    const [buttonSuccessPopup, setButtonSuccessPopup] = useState(false);
    const [buttonFailurePopup, setButtonFailurePopup] = useState(false);
    const [flag,setFlag] =useState(true)
    var startValues={
    FirstName:'',
    LastName:'',
    PassportNumber:'',
    Email:''
    }

    if(flag){
      axios.get('http://localhost:150/flight/getUserById')
      .then(function (response) {
      
        startValues=response.data
        
        setValues({
        FirstName:startValues.FirstName,
        LastName:startValues.LastName,
        PassportNumber:startValues.PassportNumber,
        Email:startValues.Email

        })
          setFlag(false)
      })
      .catch(function (error) {
        console.log(error);
        setFlag(false)
      });
}
  
    const [values, setValues] = useState({
     FirstName:startValues.FirstName,
     LastName:startValues.LastName,
     PassportNumber:startValues.LastName,
     Email:startValues.Email
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
          <Input type="text" required id="FirstName" value={values.FirstName} onChange={set('FirstName')}  ></Input><br></br>
          <label > Last name :</label><br></br>
          <Input type="text" required id="LastName" value={values.LastName} onChange={set('LastName')}  ></Input><br></br>
          <label > passport number :</label><br></br>
          <Input type="number" required id="PassportNumber" value={values.PassportNumber} onChange={set('PassportNumber')} ></Input><br></br>
          <label > email :</label><br></br>
          <Input type="email" required id="Email" value={values.Email} onChange={set('Email')} ></Input><br></br>
          
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
  