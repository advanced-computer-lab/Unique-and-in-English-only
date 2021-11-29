import Footer from "./Footer";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Card from "./Card";
import "./userHome.css";
import FlightSearch from "./searchFlightDiv.js";
const userHome = () =>{
    return(<div>
 <nav className="navbar">
                <ResponsiveAppBar/>
            </nav>
        <div className="mainContainer" >
          
           <FlightSearch/>
            <Card/>

        </div>
           </div>
    )
}
export default userHome;