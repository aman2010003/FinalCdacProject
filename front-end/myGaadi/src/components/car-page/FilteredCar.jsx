import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Style/Filter.css";
import { useShortlist } from "../../contexts/ShortlistContext";
import { config } from "../../config";
const FilterCar = () => {
  const location = useLocation();
  
  const navigate = useNavigate();
  const { shortlisted, addToShortlist, removeFromShortlist } = useShortlist();

  const [startIndex, setStartIndex] = useState(1);
  const [cars, setCars] = useState([]);

  const { brand, city } = location.state || {};

  const body = {
  location: typeof city === "string" ? city : city?.name ?? null,
  brand: typeof brand === "string" ? brand : brand?.name ?? null,
};

  console.log(body)
  useEffect(() => {
    axios
      .post(`${config.serverURL}/cars/filter`, body)
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => {
        console.error("Error fetching cars:", err);
      });
  }, []);

  const visibleCars = cars.slice(startIndex - 1, startIndex + 2);

  const handleNext = () => {
    if (startIndex < cars.length - 1) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 1) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleClick = (carId) => {
    navigate(`/Home/cars/${carId}`);
  };

  const handleWishlist = (car, e) => {
    e.stopPropagation();
    const alreadyWishlisted = shortlisted.find((c) => c.carId === car.carId);

    if (alreadyWishlisted) {
      toast.info("Removed from wishlist");
      removeFromShortlist(car.carId);
    } else {
      toast.success("Added to wishlist");
      addToShortlist(car);
    }
  };

  return (
    <div className="carousel-container">
      <button
        onClick={handlePrev}
        disabled={startIndex <= 1}
        className="nav-btn"
      >
        ←
      </button>

      {visibleCars.map((car, idx) => {
        const isCenter = idx === 1;
        const isWishlisted = shortlisted.some((c) => c.carId === car.carId);

        return (
          <div
            key={car.carId}
            className={`car-card ${isCenter ? "center-card" : "side-card"}`}
            onClick={() => handleClick(car.carId)}
            style={{ position: "relative" }} // Ensure relative for absolute heart
          >
            {/* Heart button at top-right */}
            <button
              className="wishlist-btn"
              onClick={(e) => handleWishlist(car, e)}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              tabIndex={0}
            >
              {isWishlisted ? (
                <FaHeart className="heart filled" />
              ) : (
                <FaRegHeart className="heart" />
              )}
            </button>

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

      <button
        onClick={handleNext}
        disabled={startIndex >= cars.length - 1}
        className="nav-btn"
      >
        →
      </button>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default FilterCar;
