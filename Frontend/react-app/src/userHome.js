import Footer from "./Footer";
import ResponsiveAppBar from "./ResponsiveAppBar.js";
import Card from "./Card";
import "./userHome.css";
import FlightSearch from "./searchFlightDiv.js";
const userHome = () => {
    return (
        <div className="mainContainer" >

            <FlightSearch />
            <Card />

        </div>

    )
}
export default userHome;