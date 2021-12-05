import Footer from "./Footer";
import ResponsiveAppBar from "./ResponsiveAppBar";
const home = () =>{
    return(
        <div>
          
            <nav className="navbar">
                <ResponsiveAppBar/>
                
                <a href="/createFlight">Create Flight</a>
                <br></br>
                <a href="/searchFlight">Search FLight</a>
                <br></br>
                <a href="/listFlights">List FLight</a>
            </nav>
        </div>
           
    )
}
export default home;