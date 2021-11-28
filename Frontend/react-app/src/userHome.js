import Footer from "./Footer";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Card from "./Card";
import "./userHome.css";
const userHome = () =>{
    return(<div>
 <nav className="navbar">
                <ResponsiveAppBar/>
            </nav>
        <div className="mainContainer" >
          
           
            <Card/>



        </div>
           </div>
    )
}
export default userHome;