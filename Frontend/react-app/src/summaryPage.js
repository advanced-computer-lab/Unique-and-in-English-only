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
    const paperStyle = { padding: 20, height: '800px', width: 900, margin: "150px auto", minheight: '1300px' }

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

    useEffect(() => {
        axios.get('http://localhost:150/flight/getOutgoingFlight')
            .then(function (response) {
                setOutgoingFlight(response.data)

            })
            .catch(function (error) {

            });
        axios.get('http://localhost:150/flight/getReturnFlight')
            .then(function (response) {
                setReturnFlight(response.data)

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

                setReturnSeats(response.data)
                console.log(response)
                if (response.data != '')
                    setFlagReturn(true)
            })
            .catch(function (error) {
                console.log(error)
            });
        axios.get('http://localhost:150/flight/getAdults')
            .then(function (response) {

                setAdults(response.data)
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            });

        axios.get('http://localhost:150/flight/getChildren')
            .then(function (response) {

                setChildren(response.data)
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            });

    }, [])


    const onSubmit = (e) => {
        //   history.push("")
        const ticketObj = { outgoingFlight, returnFlight, outgoingSeats, returnSeats, confirmationNum: "ungiuhaf68n", cabin }
        axios.post('http://localhost:150/flight/confirmTicket', ticketObj)
            .then(function (response) {
                setOutgoingSeats(response.data)
                console.log(response.data)
                setFlagOutGoing(true)
            })
            .catch(function (error) {
                console.log(error)
            });


    }
    if (flagReturn && flagOutGoing) {
        console.log(true)
        return (

            <ThemeProvider theme={theme}>
                <Grid align="center">
                    <Paper elevation={10} style={paperStyle}>
                        <Grid>
                            <SummarizeOutlinedIcon color="primary" style={{ fontSize: "100" }} />
                        </Grid>
                        <br />
                        <Grid container>
                            <Grid item xs={6} align="left">
                                <h2 style={{ color: "#be8b14" }}>Outgoing Flight:-</h2>
                                <FlightSummary f={outgoingFlight} adults={adults} children={children} cabin={cabin}></FlightSummary>
                                {outgoingSeats.map((s) =>
                                    <h4 display="inline">Booked seats: {s.number}</h4>
                                )}
                                <hr />
                            </Grid>
                            <Grid item xs={6} align="left">
                                <h2 style={{ color: "#be8b14" }}>Return Flight:-</h2>
                                <FlightSummary f={returnFlight} adults={adults} children={children} ></FlightSummary>
                                {returnSeats.map((s) =>
                                    <h4 display="inline">Booked seats: {s.number}</h4>
                                )}
                                <hr />

                            </Grid>
                            <Grid item xs={12}>
                                <Button type="button" variant="contained" style={{ backgroundColor: '#bd8b13', width: '30%' }} onClick={(e) => { onSubmit(e) }}>Confirm</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </ThemeProvider>

        )
    }
    else {
        console.log(false)
        return (
            <ThemeProvider theme={theme}>
                <Grid align="center">
                    <Paper elevation={10} style={paperStyle}>
                        <Grid>
                            <SummarizeOutlinedIcon color="primary" style={{ fontSize: "100" }} />
                        </Grid>
                        <br />
                        <Grid container>
                            <Grid item xs={6} align="left">
                                <h2 style={{ color: "#be8b14" }}>Outgoing Flight:-</h2>

                                <FlightSummary f={outgoingFlight} ></FlightSummary>
                                <h4>Booked seats:</h4>
                                <hr />
                            </Grid>
                            <Grid item xs={6} align="left">
                                <h2 style={{ color: "#be8b14" }}>Return Flight:-</h2>
                                <FlightSummary f={returnFlight} ></FlightSummary>
                                <h4>Booked seats:</h4>
                                <hr />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </ThemeProvider>
        )
    }
}

export default SummaryPage;