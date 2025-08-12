import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useShortlist } from "../../contexts/ShortlistContext";
import "../../Style/homepage/CarBodyType.css";
import { config } from "../../config";

const CarBodyType = () => {
  const [recentCars, setRecentCars] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();
  const { shortlisted, addToShortlist, removeFromShortlist } = useShortlist();

  useEffect(() => {
    axios
      .get(`${config.serverURL}/cars/all`)
      .then((res) => {
        const sorted = res.data.sort((a, b) => b.carId - a.carId);
        const latest = sorted.slice(0, 10);
        setRecentCars(latest);
      })
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  const visibleCars = recentCars.slice(startIndex, startIndex + 4);

  const scrollLeft = () => {
    setStartIndex((prev) => Math.max(prev - 4, 0));
  };

  const scrollRight = () => {
    setStartIndex((prev) => Math.min(prev + 4, recentCars.length - 4));
  };

  const handleClick = (carId) => {
    navigate(`/Home/cars/${carId}`);
  };

  return (
    <div className="car-container">
      <h2 className="car-heading">Recently Added Cars</h2>
      <div className="scroll-container-wrapper">
        <FaChevronLeft
          className="scroll-arrow left"
          onClick={scrollLeft}
          style={{
            opacity: startIndex === 0 ? 0.5 : 1,
            pointerEvents: startIndex === 0 ? "none" : "auto",
          }}
        />

        <div className="scroll-container">
          {visibleCars.map((car) => {
            const isWishlisted = shortlisted.some((c) => c.carId === car.carId);

            return (
              <div
                key={car.carId}
                className="car-card horizontal"
                onClick={() => handleClick(car.carId)}
              >
                <div
                  className="wishlist-icon"
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
                  <p>₹{car.price?.toLocaleString()} *</p>
                  <p>
                    {car.registrationYear} • {car.fuelType} • {car.transmission}
                  </p>
                  <p>
                    {car.kmDriven} km • {car.ownership} Owner
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <FaChevronRight
          className="scroll-arrow right"
          onClick={scrollRight}
          style={{
            opacity: startIndex + 4 >= recentCars.length ? 0.5 : 1,
            pointerEvents:
              startIndex + 4 >= recentCars.length ? "none" : "auto",
          }}
        />
      </div>
    </div>
  );
};

export default CarBodyType;
