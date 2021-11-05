import axios from "axios"
import React from "react";
class createFlight extends React  {
    constructor(props) {
    super(props);

    this.state = {
      Flight: {
        FlightNumber: props.FlightNumber,
        DepartureTime: props.DepartureTime,
        ArrivalTime: props.ArrivalTime,
        EconomySeatsNumber: props.EconomySeatsNumber,
        BuisnessSeatsNumber: props.BuisnessSeatsNumber,
        DeparturePort: props.DeparturePort,
        ArrivalPort: props.ArrivalPort,
      }
    }
  }
    

    

    handleButtonClicked=()=>{
        axios.post('"http://localhost:8000/flight/createFlight"', this.state.Flight)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render() {
        
        return(
            <div className="createflight-form">
            <form>
            <label for="FlightNumber">Flight Number :</label><br></br>
            <input type="text" id="FlightNumber" value={this.state.Flight.FlightNumber} ></input><br></br>
            <label for="DepartureTime">Departure Time :</label><br></br>
            <input type="text" id="DepartureTime" value={this.state.Flight.DepartureTime}  ></input><br></br>
            <label for="ArrivalTime">Arrival Time :</label><br></br>
            <input type="text" id="ArrivalTime"  value={this.state.Flight.ArrivalTime} ></input><br></br>
            <label for="EconomySeatsNumber">Economy Seats Number :</label><br></br>
            <input type="text" id="EconomySeatsNumber" ></input><br></br>
            <label for="BuisnessSeatsNumber">Buisness Seats Number :</label><br></br>
            <input type="text" id="BuisnessSeatsNumber" value={this.state.Flight.BuisnessSeatsNumber}  ></input><br></br>
            <label for="DeparturePort">Departure Port : </label><br></br>
            <input type="text" id="DeparturePort" value={this.state.Flight.DeparturePort}  ></input><br></br>
            <label for="ArrivalPort">Arrival Port : </label><br></br>
            <input type="text" id="ArrivalPort" value={this.state.Flight.ArrivalPort}  ></input><br></br>
            <button type="button" onClick={()=>{
                this.state.Flight.FlightNumber=FlightNumber.input;
                this.state.Flight.DepartureTime=DepartureTime.input;
                this.state.Flight.ArrivalTime=ArrivalTime.input;
                this.state.Flight.EconomySeatsNumber=EconomySeatsNumber.input;
                this.state.Flight.BuisnessSeatsNumber=BuisnessSeatsNumber.input;
                this.state.Flight.DeparturePort=DeparturePort.input;
                this.state.Flight.ArrivalPort=ArrivalPort.input;
                this.handleButtonClicked()
            }}>Create</button>
        </form>
    </div>
        
     );
    }
}
 
export default createFlight;