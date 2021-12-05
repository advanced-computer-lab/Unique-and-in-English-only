import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import "./SeatSelection.css"
import SeatPicker from "react-seat-picker";
import Seatmap from 'react-seatmap';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';





function SeatSelection(props) {

    const addSeat = props.addSeat;
    const removeSeat = props.removeSeat;
    //flightType either  "Return" or "Outgoing"
    const flightType = props.flightType;
    const reservationDetails = props.reservationDetails
    const history = useHistory();
    var flight;
    // const selectedSeats = props.selectedSeats;
    // const setSelectedSeats = props.setSelectedSeats;
    const [selectedSeats, setSelectedSeats] = useState([]);
    // const [reservationDetails, setReservationDetails] = useState({});
    var seats = new Array();

    const Alert = React.forwardRef(function Alert(props, ref) {

        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open1, setOpen1] = React.useState(false);
    const handleClick1 = () => {
        setOpen1(true);
    };

    if (flightType == "Outgoing") {
        flight = reservationDetails.outgoingFlightSelected;
    }
    else {
        flight = reservationDetails.returnFlightSelected;
    }

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    // useEffect(() => {
    //     axios.get('http://localhost:150/flight/getReservationDetails').then(
    //         (result) => {

    //             setReservationDetails(result.data);

    //             console.log("reservationDetails Here");
    //         });
    // });


    if (isEmpty(reservationDetails)) {

        return (
            <div className="mainContainer"></div>
        )
    }

    console.log("reservationDetails")
    console.log(reservationDetails);

    const cabin = reservationDetails.cabin
    var flightSeats = {};

    if (cabin == "Buisness") {
        if (flightType == "Outgoing") {
            flightSeats = reservationDetails.outgoingFlightSelected.BuisnessSeats;
        }
        else if (flightType == "Return") {
            flightSeats = reservationDetails.returnFlightSelected.BuisnessSeats;

        }
    }
    else if (cabin == "Economy") {
        if (flightType == "Outgoing") {
            flightSeats = reservationDetails.outgoingFlightSelected.EconomySeats;
        }
        else if (flightType == "Return") {
            flightSeats = reservationDetails.returnFlightSelected.EconomySeats;
        }
    }
    // if (cabin == "Buisness") {
    //     flightSeats = reservationDetails.outgoingFlightSelected.BuisnessSeats;

    // }
    // else {
    //     flightSeats = reservationDetails.outgoingFlightSelected.BuisnessSeats;
    //}


    var counter = 0;

    const tmpSeats = new Array();

    // setTimeout(() => console.log("Timeee"), 2000);


    var i = 0;
    var flightSeatsClone = [...flightSeats];
    while (flightSeatsClone.length > 0) {
        var row = new Array();
        for (let index = 0; index < 4 && flightSeatsClone.length > 0; index++) {
            row.push(flightSeatsClone.splice(0, 1)[0]);

        }
        seats.push(row)

    }


    // for (let index = 0; index < 30; index++) {
    //     const row = new Array();
    //     for (let j = 0; j < 6; j++) {


    //         // if (flightSeats.length == 0) {
    //         //     console.log("break 1")
    //         //     break;
    //         // }
    //         // const seat = flightSeats.splice(0, 1);
    //         // row.push(seat[0]);

    //         //to be removed >>>>
    //         row.push({ isSelected: false, number: counter, id: counter + 1 });
    //         counter++;
    //         //<<<<

    //         if (j % 2 == 1)
    //             // row.push(null);
    //             ;

    //     }

    //     // seats.push(row);

    //     // if (flightSeats.length == 0) {
    //     //     console.log("break 2")

    //     //     break;
    //     // }

    // }
    console.log("seats");
    console.log(seats);

    function removeSeatFromArray(arr, obj) {

        const newArr = arr.filter((seat) => seat.number != obj.number)
        // console.log(selectedSeats);
        setSelectedSeats(newArr);
        return;


    }



    const maxReservableSeats = parseInt(reservationDetails.adults) + parseInt(reservationDetails.children);


    const addSeatCallback = ({ row, number, id }, addCb) => {
        console.log(`Added seat ${number}, row ${row}, id ${id}`)
        const newTooltip = `price ${flight.price} $`
        selectedSeats.push({ number });
        console.log(selectedSeats);
        addCb(row, number, id, newTooltip)
    }

    const removeSeatCallback = ({ row, number, id }, removeCb) => {
        console.log(`remove seat ${number}, row ${row}, id ${id}`);
        const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
        removeSeatFromArray(selectedSeats, { number });
        removeCb(row, number, newTooltip);
    };


    const submitHandler = () => {

        if (selectedSeats.length < maxReservableSeats) {
            handleClick1();
            return;
        }

        axios.post(`http://localhost:150/flight/setSelected${flightType}Seats/`, selectedSeats).then((result) => {

            console.log(selectedSeats);

            if (flightType == "Outgoing")
                history.push("ReturnSeatSelection");
            else if (flightType == "Return") {
                history.push("summaryPage");

            }
        }

        )
    }







    return (

        <div className="seatSelection">

            <SeatPicker
                addSeatCallback={addSeatCallback}
                removeSeatCallback={removeSeatCallback}
                rows={seats}
                maxReservableSeats={maxReservableSeats}
                selectedByDefault
                loading={false}
            />
            <Button onClick={submitHandler}> Select  </Button>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                    <Alert onClose={handleClose1} severity="error" sx={{ width: '100%' }}>
                        You have to choose {maxReservableSeats} seats !
                     </Alert>
                </Snackbar>
            </Stack>

        </div>
    )



}

function isEmpty(obj) {
    for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
}


export default SeatSelection;