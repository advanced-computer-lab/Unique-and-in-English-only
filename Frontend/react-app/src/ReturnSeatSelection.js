import React from 'react';
import SeatSelection from './SeatSelection';
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import AirlineSeatReclineExtraOutlinedIcon from '@mui/icons-material/AirlineSeatReclineExtraOutlined';




function ReturnSeatSelection() {


    const [reservationDetails, setReservationDetails] = useState({}); const cabin = reservationDetails.cabin;
    const seats = [];
    useEffect(() => {
        axios.get('http://localhost:150/flight/getReservationDetails').then(
            (result) => {

                setReservationDetails(result.data);

            });



    }, []);


    return (
        <div className="mainContainer" >
            <div align="center">
            <AirlineSeatReclineExtraOutlinedIcon color="primary" style={{fontSize:"100"}}/>
            <h1 style={{color:"#be8b14"}}>Select return flight seats</h1>
            </div>
             
            <SeatSelection reservationDetails={reservationDetails} flightType="Return" />
        </div>
    )
}

export default ReturnSeatSelection;