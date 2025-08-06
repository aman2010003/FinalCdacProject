import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
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
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your city"
              className="city-name"
              onChange={(e) => {
                const selectedCity = { name: e.target.value }; // or from dropdown options
                setCity(selectedCity);
              }}
            />
            <span className="input-icon location-icon">
              {/* Location icon - using inline SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <span className="input-icon dropdown-icon">
              {/* Dropdown arrow icon - using inline SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
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
