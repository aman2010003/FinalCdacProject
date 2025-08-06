import React from "react";

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
              <a href="#">Teams</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
          </ul>

          <ul>
            <h1>About</h1>
            <li>
              <a href="#">Company</a>
            </li>
            <li>
              <a href="#">Location</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Our Services</a>
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
