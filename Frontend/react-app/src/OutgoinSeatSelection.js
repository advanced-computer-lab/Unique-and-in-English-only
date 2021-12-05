import React from 'react';
import SeatSelection from './SeatSelection';
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";



function OutgoingSeatSelection() {


    const [reservationDetails, setReservationDetails] = useState({});
    const maxNoOfPassengers = reservationDetails.adults + reservationDetails.children;
    const cabin = reservationDetails.cabin;
    const seats = [];
    console.log("cabin");
    console.log(cabin);
    useEffect(() => {
        axios.get('http://localhost:150/flight/getReservationDetails').then(
            (result) => {

                setReservationDetails(result.data);

            });



    }, []);


    return (
        <div className="mainContainer">
            <h1 className="centerText">Select Outgoing flight seats</h1>
            <SeatSelection reservationDetails={reservationDetails} flightType="Outgoing" />
        </div>
    )
}

export default OutgoingSeatSelection;