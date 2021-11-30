import React from "react";
import "./Footer.css";
import Link from '@mui/material/Link';

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row1">
          {/* Column1 */}
          <div className="col">
            <h2>Unique Airways</h2>
            <h3 className="list-unstyled">
              <li>342-420-6969</li>
              <li>Cairo,Egypt</li>
              <li>13 Street 5th-settelment</li>
            </h3>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>USEFUL LINKS</h4>
            <ui className="list-unstyled">
            <li>  <Link href="#" underline="hover">Baggage</Link></li>
              <li> <Link href="#" underline="hover">Payment options</Link></li>
              <li> <Link href="#" underline="hover">Cookie Policy</Link></li>
              <li> <Link href="#" underline="hover">Tax refund</Link></li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>ABOUT UNIQUE AVIATION GROUP</h4>
            <ui className="list-unstyled">
             <li>  <Link href="#" underline="hover">Unique Guest</Link></li>
              <li> <Link href="#" underline="hover">Unique Cargo</Link></li>
              <li> <Link href="#" underline="hover">Unique Engineering</Link></li>
              <li> <Link href="#" underline="hover">Unique Aviation Training</Link></li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Unique Airways | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;