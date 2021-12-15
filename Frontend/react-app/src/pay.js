import React,{useEffect, useState} from "react";
import StripeCheckout from "react-stripe-checkout"
import Button from '@mui/material/Button';
import axios from "axios";

function Pay() {
    const [product,setProduct]=useState({name:"ahmed",price:"10000",productBy:"unique airways"})
    const price=1000
    
    const makePayment=token=>{
        const body ={
            token,
            product
        }
        const header={
            "Content-Type":"application/json"
        }
        
            axios.post('http://localhost:150/user/pay', body)
        .then(function (response) {
          console.log("status",response);
          const {status}=response
          console.log("status",status)
          
        })
        .catch(function (error) {
          console.log("error",error);
          
        });
          
    }

    return(
        <div style={{marginTop:"100px"}}>
            
               
            <StripeCheckout stripeKey="pk_test_51K69PxHSnuUCIvbwdqHkVQzUOiDz7lPbkuI0ES8nGf7NJyp1q2apcATscjtzJfoH3dil22wMvjnGA3xj9GCESc7m00drV3YzVF" token={makePayment} name="flight" amount={price} >
            <Button  type="button"  variant="contained" style={{backgroundColor:'#bd8b13',width:'50%',height:"100%"}} >Confirm payment</Button>
            </StripeCheckout>

        </div>
    )
}
export default Pay