import axios from "axios"
import { Component } from "react";
class searchFlights extends Component  {
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
        axios.post('"http://localhost:8000/flight/searchFlight"', this.state.Flight)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render(){
        return ( 
            <div className="createflight-form">
                <form>
                    <label for="FlightNumber">Flight Number :</label><br></br>
                    <input type="text" id="FlightNumber" ></input><br></br>
                    <label for="DepartureTime">Departure Time :</label><br></br>
                    <input type="text" id="DepartureTime" ></input><br></br>
                    <label for="ArrivalTime">Arrival Time :</label><br></br>
                    <input type="text" id="ArrivalTime" ></input><br></br>
                    <label for="EconomySeatsNumber">Economy Seats Number :</label><br></br>
                    <input type="text" id="EconomySeatsNumber" ></input><br></br>
                    <label for="BuisnessSeatsNumber">Buisness Seats Number :</label><br></br>
                    <input type="text" id="BuisnessSeatsNumber" ></input><br></br>
                    <label for="DeparturePort">Departure Port : </label><br></br>
                    <input type="text" id="DeparturePort" ></input><br></br>
                    <label for="ArrivalPort">Arrival Port : </label><br></br>
                    <input type="text" id="ArrivalPort" ></input><br></br>
                    <button type="button" onClick={()=>{
                        this.state.Flight.FlightNumber=FlightNumber.input;
                        this.state.Flight.DepartureTime=DepartureTime.input;
                        this.state.Flight.ArrivalTime=ArrivalTime.input;
                        this.state.Flight.EconomySeatsNumber=EconomySeatsNumber.input;
                        this.state.Flight.BuisnessSeatsNumber=BuisnessSeatsNumber.input;
                        this.state.Flight.DeparturePort=DeparturePort.input;
                        this.state.Flight.ArrivalPort=ArrivalPort.input;
                        this.handleButtonClicked()}
                        }>Create</button>
                </form>
            </div>
        );
    }
}
 
export default searchFlights;