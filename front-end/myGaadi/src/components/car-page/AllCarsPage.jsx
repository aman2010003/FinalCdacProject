import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useShortlist } from "../../contexts/ShortlistContext";
import "../../Style/CarFilter.css";
import { config } from "../../config";
const AllCarsPage = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const { shortlisted, addToShortlist, removeFromShortlist } = useShortlist();

  useEffect(() => {
    axios
      .get(`${config.serverURL}/cars/all`)
      .then((res) => setCars(res.data))
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  const handleClick = (carId) => {
    navigate(`/Home/cars/${carId}`);
  };

  return (
    <div className="cars-grid-container">
      {cars.map((car) => {
        const isWishlisted = shortlisted.some((c) => c.carId === car.carId);

        return (
          <div
            key={car.carId}
            className="car-card"
            onClick={() => handleClick(car.carId)}
          >
            <div
              className="wishlist-btn"
              onClick={(e) => {
                e.stopPropagation();
                isWishlisted
                  ? removeFromShortlist(car.carId)
                  : addToShortlist(car);
              }}
            >
              {isWishlisted ? (
                <FaHeart className="heart filled" />
              ) : (
                <FaRegHeart className="heart" />
              )}
            </div>

            {car.images?.length > 0 ? (
              <img
                src={`data:image/jpeg;base64,${car.images[0].imagebase64}`}
                alt={`${car.brand} ${car.model}`}
                className="car-image"
              />
            ) : (
              <div className="no-image">No Image</div>
            )}

            <div className="car-info">
              <h3>
                {car.brand} {car.model}
              </h3>
              <p>
                <strong>₹{car.price?.toLocaleString()}</strong>
              </p>
              <p>
                {car.registrationYear} • {car.fuelType} • {car.transmission}
              </p>
              <p>
                {car.kmDriven} km • {car.ownership} Owner
              </p>
              <p>Location: {car.location}</p>
              <p>Registration No: {car.registrationNo}</p>
              <p>Color: {car.color}</p>

              <div className="tags">
                {car.fuelType === "Electric" && (
                  <span className="tag green">⚡ Electric</span>
                )}
                {car.insuranceValid && (
                  <span className="tag blue">🛡 Insurance Valid</span>
                )}
              </div>

              <button
                className="offer-button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/Home/cars/${car.carId}`);
                }}
              >
                Check Now
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllCarsPage;
