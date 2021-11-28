import Footer from "./Footer";
const home = () =>{
    return(
        <div>
        
            <nav className="navbar">
                <h1>Flight Site</h1>
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