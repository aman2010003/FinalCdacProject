import React from "react";
import { Link } from "react-router-dom";
import "../Style/Footer.css";

function Footer() {
  return (
    <>
      <footer>
        <div className="up-section">
          <a href="#" class="f-logo">
            MYGAADI
          </a>

          <ul>
            <h1>Company</h1>
            <li>
             <Link to="/home/teams">Teams</Link>
            </li>
            <li>
               <Link to="/home/services">Services</Link>
            </li>
            <li>
               <Link to="/home/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/home/support">Support</Link>
            </li>
          </ul>

          <ul>
            <h1>About</h1>
            <li>
              <Link to="/home/company">Company</Link>
            </li>
            <li>
               <Link to="/home/location">Location</Link>
            </li>
            <li>
               <Link to="/home/about">About</Link>
            </li>
            <li>
              <Link to="/home/our-services">Our Services</Link>
            </li>
          </ul>

          <ul>
            <h1>Contact us</h1>
            <li>
              <p>9022605088</p>
            </li>
            <li>
              <p>Sunbeam,CDAC</p>
            </li>
            <li>
              <p>Karad</p>
            </li>
          </ul>
        </div>

        <p class="copyright">
          <span class="f-logo">MYGAADI</span>Copyright 2025
        </p>
      </footer>
    </>
  );
}

export default Footer;
