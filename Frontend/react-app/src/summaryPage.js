import axios from 'axios';
import { useState } from 'react'
import "./searchFlights.css";
import FlightSummary from './FlightSummary.js';

function SummaryPage(props) {
    var seats=[{number:"a5"},{number:"b2"}]
    const [outgoingFlight,setOutgoingFlight]=useState({FlightNumber:"",
        DepartureTime: '',
        ArrivalTime: '',
        EconomySeatsNumber: '',
        BuisnessSeatsNumber:'',
        DeparturePort: '',
        ArrivalPort: '',
        DepartureTerminal: '',
        ArrivalTerminal: '',})
    const [returnFlight,setReturnFlight]=useState({FlightNumber: "",
            DepartureTime: '',
            ArrivalTime: '',
            EconomySeatsNumber: '',
            BuisnessSeatsNumber:'',
            DeparturePort: '',
            ArrivalPort: '',
            DepartureTerminal: '',
            ArrivalTerminal: '',})

    axios.get('http://localhost:150/flight/getOutgoingFlight')
          .then(function (response) {
            setOutgoingFlight({FlightNumber: response.data.FlightNumber,
                DepartureTime: response.data.DepartureTime,
                ArrivalTime: response.data.ArrivalTime,
                EconomySeatsNumber: response.data.EconomySeatsNumber,
                BuisnessSeatsNumber: response.data.BuisnessSeatsNumber,
                DeparturePort: response.data.DeparturePort,
                ArrivalPort: response.data.ArrivalPort,
                DepartureTerminal: response.data.DepartureTerminal,
                ArrivalTerminal: response.data.ArrivalTerminal,})
          })
          .catch(function (error) {
            
          });
          axios.get('http://localhost:150/flight/getReturnFlight')
          .then(function (response) {
            setReturnFlight({FlightNumber: response.data.FlightNumber,
                DepartureTime: response.data.DepartureTime,
                ArrivalTime: response.data.ArrivalTime,
                EconomySeatsNumber: response.data.EconomySeatsNumber,
                BuisnessSeatsNumber: response.data.BuisnessSeatsNumber,
                DeparturePort: response.data.DeparturePort,
                ArrivalPort: response.data.ArrivalPort,
                DepartureTerminal: response.data.DepartureTerminal,
                ArrivalTerminal: response.data.ArrivalTerminal,})
          
          })
          .catch(function (error) {
            
          });
    
    return (
        <div className="summary-main">
            <div className="outgoingFlight">
                <h1 style={{marginLeft:20}}>outgoing flight :</h1>
                <FlightSummary f={outgoingFlight} ></FlightSummary>
                <h2 style={{marginLeft:20}}>booked seats: </h2>
                {seats.map((s) =>
                 <p style={{marginLeft:40}}>{s.number}</p>   
                )}
            </div>
            <hr />
            <div className="returnFlight">
            <h1 style={{marginLeft:20}} >Return flight :</h1>
                <FlightSummary f={returnFlight} ></FlightSummary>
                <h2 style={{marginLeft:20}} >booked seats: </h2>
                {seats.map((s) =>
                 <p style={{marginLeft:40}}>{s.number}</p>   
                )}
            </div>

        </div>
    )
}

export default SummaryPage;