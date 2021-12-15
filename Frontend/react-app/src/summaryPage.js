import axios from 'axios';
import { useState } from 'react'
import "./searchFlights.css";
import FlightSummary from './FlightSummary.js';
import ReturnSeatSelection from './ReturnSeatSelection';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import { useEffect } from "react";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { Avatar, createMuiTheme, FormControlLabel, ThemeProvider } from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ScrollToTop from './scrollToTop';
import StripeCheckout from "react-stripe-checkout"

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#be8b14'
        },
        secondary: {
            main: '#000000'
        }
    }
})


function SummaryPage(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    const paperStyle = { padding: 20, height: '800px', width: 900, margin: "150px auto" }

    const history = useHistory();
    const [flagOutGoing, setFlagOutGoing] = useState(false)
    const [flagReturn, setFlagReturn] = useState(false)
    const [adults, setAdults] = useState(0);
    const [cabin, setCabin] = useState(0);
    const [children, setChildren] = useState(0);
    const [outgoingFlight, setOutgoingFlight] = useState({
        FlightNumber: "",
        DepartureTime: '',
        ArrivalTime: '',
        EconomySeatsNumber: '',
        BuisnessSeatsNumber: '',
        DeparturePort: '',
        ArrivalPort: '',
        DepartureTerminal: '',
        ArrivalTerminal: '',
        BuisnessSeats: '',
        EconomySeats: '',
        BusinessPrice: '',
    })
    const [returnFlight, setReturnFlight] = useState({
        FlightNumber: "",
        DepartureTime: '',
        ArrivalTime: '',
        EconomySeatsNumber: '',
        BuisnessSeatsNumber: '',
        DeparturePort: '',
        ArrivalPort: '',
        DepartureTerminal: '',
        ArrivalTerminal: '',
        BuisnessSeats: '',
        EconomySeats: '',
    })
    const [outgoingSeats, setOutgoingSeats] = useState([]);
    const [returnSeats, setReturnSeats] = useState([]);
    const [outgoingPrice, setOutgoingPrice] = useState(0);
    const [returnPrice, setReturnPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);


    const getPriceOfFlight = (flight) => {
        var price = 0;
        if (cabin == "Business") {
            price = flight.BusinessPrice;
        }
        else {
            price = flight.EconomyPrice;
        }
        return price * parseInt(adults) + price * parseInt(children) * 0.5;
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open1, setOpen1] = React.useState(false);

    const handleClick1 = () => {
        setOpen1(true);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    useEffect(() => {
        axios.get('http://localhost:150/flight/getOutgoingFlight')
            .then(function (response) {
                setOutgoingFlight(response.data);



            })
            .catch(function (error) {

            });
        axios.get('http://localhost:150/flight/getReturnFlight')
            .then(function (response) {
                setReturnFlight(response.data);


            })
            .catch(function (error) {

            });
        axios.get('http://localhost:150/flight/getCabin')
            .then(function (response) {
                setCabin(response.data);


            })
            .catch(function (error) {

            });
        axios.get('http://localhost:150/flight/getSelectedOutgoingSeats')
            .then(function (response) {
                setOutgoingSeats(response.data)
                console.log(response)
                if (response.data != '')
                    setFlagOutGoing(true)
            })
            .catch(function (error) {
                console.log(error)
            });
        axios.get('http://localhost:150/flight/getSelectedReturnSeats')
            .then(function (response) {

                setReturnSeats(response.data);

                console.log(response)
                if (response.data != '')
                    setFlagReturn(true)
            })
            .catch(function (error) {
                console.log(error)
            });
        axios.get('http://localhost:150/flight/getAdults')
            .then(function (response) {

                setAdults(response.data.adults);
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            });

        axios.get('http://localhost:150/flight/getChildren')
            .then(function (response) {

                setChildren(response.data.children);



            })
            .catch(function (error) {
                console.log(error)
            });

    }, []);

    useEffect(() => {
        setPrices();

    }, [adults, children, outgoingFlight, returnFlight]);


    const setPrices = () => {
        setOutgoingPrice(getPriceOfFlight(outgoingFlight));
        setReturnPrice(getPriceOfFlight(returnFlight));
        setTotalTicketPrice();
        console.log(getPriceOfFlight(outgoingFlight+"ticket1"));
        console.log(getPriceOfFlight(returnFlight));
    }

    const setTotalTicketPrice = () => {

        setTotalPrice(outgoingPrice + returnPrice);
        console.log(outgoingPrice + returnPrice+"asdasd");
    }
    const [product,setProduct]=useState({name:"ahmed",price:"10000",productBy:"unique airways"})
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
          
        }).then(function (response) {
            const ticketObj = { outgoingFlight, returnFlight, outgoingSeats, returnSeats, confirmationNum: "ungiuhaf68n", cabin, TicketTotalPrice: outgoingPrice+returnPrice }
            axios.post('http://localhost:150/flight/confirmTicket', ticketObj)
            .then(function (response) {
                setOutgoingSeats(response.data)
                console.log(response.data)
                setFlagOutGoing(true);
                
            })
            .catch(function (error) {
                console.log(error)
            });
            //history.push("/payment")
        handleClick1();
        })
        .catch(function (error) {
          console.log("error",error);
          
        });
          
    }

    const onSubmit = (e) => {
        //   history.push("")
        const ticketObj = { outgoingFlight, returnFlight, outgoingSeats, returnSeats, confirmationNum: "ungiuhaf68n", cabin, TicketTotalPrice: outgoingPrice+returnPrice }
        axios.post('http://localhost:150/flight/confirmTicket', ticketObj)
            .then(function (response) {
                setOutgoingSeats(response.data)
                console.log(response.data)
                setFlagOutGoing(true);
                
            })
            .catch(function (error) {
                console.log(error)
            });
            //history.push("/payment")
        handleClick1();



    }
    if (flagReturn && flagOutGoing) {
        console.log(true)
        return (

            
                <Grid align="center">
                    <Paper elevation={10} style={paperStyle}>
                        <Grid>
                            <SummarizeOutlinedIcon color="primary" style={{ fontSize: "100" }} />
                        </Grid>
                        <br />
                        <Grid container>
                            <Grid item xs={6} align="left">
                                <h2 style={{ color: "#be8b14" }}>Outgoing Flight:-</h2>
                                <FlightSummary f={outgoingFlight} adults={adults} children={children} cabin={cabin} price={outgoingPrice}></FlightSummary>
                                {outgoingSeats.map((s) =>
                                    <h4 display="inline">Booked seats: {s.number}</h4>
                                )}
                                <hr />
                            </Grid>
                            <Grid item xs={6} align="left">
                                <h2 style={{ color: "#be8b14" }}>Return Flight:-</h2>
                                <FlightSummary f={returnFlight} adults={adults} children={children} cabin={cabin} price={returnPrice} ></FlightSummary>
                                {returnSeats.map((s) =>
                                    <h4 display="inline">Booked seats: {s.number}</h4>
                                )}
                                <hr />

                            </Grid>
                            <Grid item xs={12}>
                                <h2>Total price : {outgoingPrice+returnPrice}</h2>
                            </Grid>
                            <Grid item xs={12}>
                            <StripeCheckout stripeKey="pk_test_51K69PxHSnuUCIvbwdqHkVQzUOiDz7lPbkuI0ES8nGf7NJyp1q2apcATscjtzJfoH3dil22wMvjnGA3xj9GCESc7m00drV3YzVF" token={makePayment} name="flight" amount={(outgoingPrice+returnPrice)*100} >
                            <Button  type="button"  variant="contained" style={{backgroundColor:'#bd8b13',width:'50%',height:"100%"}} >Confirm payment</Button>
                            </StripeCheckout>
                            </Grid>


                        </Grid>
                    </Paper>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                        <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                            The ticket is confirmed!
                         </Alert>
                    </Snackbar>
                </Stack>
                </Grid>
               
    

        )
    }
    else {
        
       
        return (
            
          <div></div>
           
        )
    }
}

export default SummaryPage;