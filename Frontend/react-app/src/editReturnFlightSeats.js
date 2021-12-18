import React from 'react';
import SeatSelection from './SeatSelection';
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";



function EditReturnSeatSelection() {


    const [reservationDetails, setReservationDetails] = useState({}); const cabin = reservationDetails.cabin;
    const seats = [];
    useEffect(() => {
        axios.get('http://localhost:150/flight/getReservationDetails').then(
            (result) => {

                setReservationDetails(result.data);

            });



    }, []);


    return (
        <div className="mainContainer">
            <h1>Select Return flight seats</h1>
            <SeatSelection reservationDetails={reservationDetails} flightType="editingReturn" />
        </div>
    )
}

export default EditReturnSeatSelection;