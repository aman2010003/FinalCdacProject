import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../../Style/City.css"
import "../../Style/homepage/cityStyle.css";
import A from "../../assets/city/Ahm.png";
import B from "../../assets/city/CityB.png";
import C from "../../assets/city/CityC.png";
import D from "../../assets/city/CityD.png";
import E from "../../assets/city/CityE.png";
import F from "../../assets/city/CityF.png";
import G from "../../assets/city/CityG.png";
import H from "../../assets/city/CityH.png";
import I from "../../assets/city/CityI.png";

const City = () => {
  const [city, setCity] = useState("");

  const handleCityChange = (value) => {
    setCity(value);
    console.log("Selected city:", value);
  };

  const navigate = useNavigate();

  const cities = [
    { name: "Ahmedabad", icon: A },
    { name: "Bangalore", icon: B },
    { name: "Chennai", icon: C },
    { name: "Delhi NCR", icon: D },
    { name: "Gurgaon", icon: E },
    { name: "Hyderabad", icon: F },
    { name: "Jaipur", icon: G },
    { name: "Kolkata", icon: H },
    { name: "Mumbai", icon: I },
    { name: "New Delhi", icon: C },
    { name: "Noida", icon: B },
    { name: "Pune", icon: D },
  ];

  return (
    <div className="app-container">
      <div className="main-content-wrapper">
        {/* Left Section: Get trusted used cars nearby */}
        <div className="left-section">
          <h2 className="section-title">Get trusted used cars nearby</h2>
          <div className="city-grid">
            {cities.map((city, index) => (
              <div
                key={index}
                className="city-card"
                onClick={() => {
                  navigate(`/Home/filtercar`, { state: { city } });
                }}
              >
                {city.name}
                <img
                  src={city.icon}
                  alt={`${city.name} icon`}
                  className="city-icon"
                />
                <p className="city-text-label">Used cars in</p>
                <p className="city-name">{city.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: I am looking to buy a second hand car in */}
        <div className="right-section">
          {/* Background illustration */}
          <div className="bg-illustration">
            <svg
              width="150"
              height="150"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 0L122.472 69.0983H195.106L136.317 110.902L158.789 180.001L100 138.197L41.2111 180.001L63.6833 110.902L4.89435 69.0983H77.5279L100 0Z"
                fill="#BFDBFE"
              />
              <circle cx="150" cy="50" r="20" fill="#FCD34D" />
              <path d="M50 150L60 180H40L50 150Z" fill="#9CA3AF" />
              <path d="M170 170L180 190H160L170 170Z" fill="#9CA3AF" />
            </svg>
          </div>

          <p className="search-prompt">
            I am looking to buy a second hand car in
          </p>
          <div className="city-input-wrapper" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        

            {/* Dropdown */}
            <select className="form-select"
              value=""
              onChange={(e) => handleCityChange(e.target.value)}
              style={{ padding: "6px 10px" }}
            >
              <option  value="">Select from list</option>
              {cities.map((c, index) => (
                <option key={index} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Or Manual Input */}
            <input
              type="text"
              placeholder="Or type your city"
              value={city}
              onChange={(e) => handleCityChange(e.target.value)}
              style={{ padding: "6px 10px" , backgroundColor:"lightsteelblue"}}
            />

          
          </div>
          <div className="search-button-wrapper">
            {/* Simple button for demonstration */}
            <button 
              onClick={() => {
                  navigate(`/Home/filtercar`, { state: { city } });
                }}
              className="search-button"
            >
              Search Cars
            </button>
          </div>
          {/* Subtle city skyline illustration */}
          <div className="city-skyline-illustration">
            <div className="building"></div>
            <div className="building large"></div>
            <div className="building small"></div>
            <div className="building medium"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default City;
