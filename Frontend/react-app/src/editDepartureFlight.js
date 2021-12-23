import Footer from "./Footer";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Card from "./Card";
import "./userHome.css";
import FlightSearch from "./searchFlightDiv.js";
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
const EditDepartureFlight = () => {
    return (
        <div className="mainContainer" align="center" >
            <EditLocationOutlinedIcon color="primary" style={{ fontSize: "150" }}/>
            <h1 style={{color:"#bd8b13"}}> Search for a new flight</h1>
            <FlightSearch />
            

        </div>

    )
}
export default EditDepartureFlight;