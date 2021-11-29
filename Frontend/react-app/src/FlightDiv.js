import React from "react";

function FlightDiv(props) {

    return (
        <div className="row" key={props.flight._id}>
            <p className="left-txt"> <b>Flight Number:{props.flight.FlightNumber} </b> </p>
            <p className="left-txt"> <b>Departure Time:{props.flight.DepartureTime} </b></p>
            <p className="left-txt"> <b>Arrival Time:{props.flight.ArrivalTime} </b></p>
            {/* <p className="left-txt"> <b>Economy Seats Number:{flight.EconomySeatsNumber} </b></p>
            <p className="left-txt"> <b>Buisness Seats Number:{flight.BuisnessSeatsNumber} </b></p>
            <p className="left-txt"> <b>Departure Port:{flight.DeparturePort} </b></p>
            <p className="left-txt"> <b>Arrival Port:{flight.ArrivalPort} </b></p>
            <p className="left-txt"> <b>Departure Port:{flight.DepartureTerminal} </b></p>
            <p className="left-txt"> <b>Arrival Port:{flight.ArrivalTerminal} </b></p> */}
            {/* <button className="left-txt" onClick={(e) => { props.DeleteClickHandler(props.flight) }}>  <b>Delete</b></button>
            <button className="left-txt" onClick={(e) => { props.UpdateClickHandler(props.flight) }}>  <b>update</b></button> */}
        </div>
    )
        ;
}



export default FlightDiv;