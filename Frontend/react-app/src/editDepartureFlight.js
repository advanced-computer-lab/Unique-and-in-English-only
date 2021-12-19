import Footer from "./Footer";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Card from "./Card";
import "./userHome.css";
import FlightSearch from "./searchFlightDiv.js";
const EditDepartureFlight = () => {
    return (
        <div className="mainContainer" >
            <h1 > Search for a new flight</h1>
            <FlightSearch />
            

        </div>

    )
}
export default EditDepartureFlight;