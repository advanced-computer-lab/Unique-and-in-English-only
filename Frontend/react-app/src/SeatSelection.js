import React from 'react';
import { useState } from 'react';
import "./SeatSelection.css"
import SeatPicker from "react-seat-picker";



function SeatSelection(props) {

    // const addSeat = props.addSeat;
    // const removeSeat = props.removeSeat;
    // const selectedSeats = props.selectedSeats;
    // const setSelectedSeats = props.setSelectedSeats;
    // const flightSeats = props.flightSeats;

    const seats = new Array();
    var counter = 0;
    for (let index = 0; index < 10; index++) {
        const row = new Array();
        for (let j = 0; j < 4; j++) {


            // if (flightSeats.length == 0) {
            //     break;
            // }
            //const seat = flightSeats.splice(0,1);
            // row.push(seat);

            //to be removed >>>>
            row.push({ isSelected: false, number: counter, id: counter + 1 });
            counter++;
            //<<<<

            if (j % 2 == 1)
                row.push(null);

        }

        seats.push(row);

        // if (flightSeats.length == 0) {
        //     break;
        // }

    }
    function removeSeatFromArray(arr, obj) {

        setSelectedSeats(arr.filter((seat) => seat.number != obj.number));
        return;


    }


    const maxReservableSeats = props.noOfPassengers;

    const [selectedSeats, setSelectedSeats] = useState([]);

    const addSeatCallback = ({ row, number, id }, addCb) => {
        console.log(`Added seat ${number}, row ${row}, id ${id}`)
        const newTooltip = `tooltip for id-${id} added by callback`
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





    return (
        <div className="seatSelection">

            <SeatPicker
                addSeatCallback={addSeatCallback}
                removeSeatCallback={removeSeatCallback}
                alpha
                visible
                rows={seats}
                maxReservableSeats={3}
                selectedByDefault
                loading={false}
            />


        </div>
    )

}

export default SeatSelection;