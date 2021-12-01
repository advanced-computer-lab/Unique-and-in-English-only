import axios from 'axios';
import { useState } from 'react'
import "./searchFlights.css";
import FlightSummary from './FlightSummary.js';
import ReturnSeatSelection from './ReturnSeatSelection';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import { useEffect } from "react";

function SummaryPage(props) {
    const history = useHistory();
    const [flagOutGoing, setFlagOutGoing] = useState(false)
    const [flagReturn, setFlagReturn] = useState(false)
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
    }, [])


    const onSubmit = (e) => {
        //   history.push("")
        const ticketObj = { outgoingFlight, returnFlight, outgoingSeats, returnSeats, confirmationNum: "ungiuhaf68n" }
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
            <div className="summary-main">
                <div className="outgoingFlight">
                    <h1 style={{ marginLeft: 20 }}>outgoing flight :</h1>
                    <FlightSummary f={outgoingFlight} ></FlightSummary>
                    <h2 style={{ marginLeft: 20 }}>booked seats: </h2>
                    {outgoingSeats.map((s) =>
                        <p style={{ marginLeft: 40 }}>{s.number}</p>
                    )}
                </div>
                <hr />
                <div className="returnFlight">
                    <h1 style={{ marginLeft: 20 }} >Return flight :</h1>
                    <FlightSummary f={returnFlight} ></FlightSummary>
                    <h2 style={{ marginLeft: 20 }} >booked seats: </h2>
                    {returnSeats.map((s) =>
                        <p style={{ marginLeft: 40 }}>{s.number}</p>
                    )}
                </div>

                <div>
                    <Button type="button" variant="contained" style={{ backgroundColor: '#bd8b13', width: '20%' }} onClick={(e) => { onSubmit(e) }}>Confirm</Button>
                </div>
            </div>
        )
    }
    else {
        console.log(false)
        return (
            <div className="summary-main">
                <div className="outgoingFlight">
                    <h1 style={{ marginLeft: 20 }}>outgoing flight :</h1>
                    <FlightSummary f={outgoingFlight} ></FlightSummary>
                    <h2 style={{ marginLeft: 20 }}>booked seats: </h2>

                </div>
                <hr />
                <div className="returnFlight">
                    <h1 style={{ marginLeft: 20 }} >Return flight :</h1>
                    <FlightSummary f={returnFlight} ></FlightSummary>
                    <h2 style={{ marginLeft: 20 }} >booked seats: </h2>

                </div>

            </div>
        )
    }
}

export default SummaryPage;