import React, { useState } from "react";
import "../../Style/homepage/Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "2019 Maruti Baleno Alpha Diesel",
      price: "₹5.66 Lakh",
      km: "73,864 km",
      fuel: "Diesel",
      transmission: "Manual",
      location: "Gota, Ahmedabad",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "2020 Tata Tiago XT",
      price: "₹6 Lakh",
      km: "13,000 km",
      fuel: "Petrol",
      transmission: "Manual",
      location: "Ghuma, Ahmedabad",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "2020 Mahindra XUV500 W11",
      price: "₹11.50 Lakh",
      km: "1,06,000 km",
      fuel: "Diesel",
      transmission: "Manual",
      location: "Navrangpura, Ahmedabad",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((car) => car.id !== id));
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      <div className="wishlist-grid">
        {wishlist.length === 0 ? (
          <p>No cars in your wishlist.</p>
        ) : (
          wishlist.map((car) => (
            <div key={car.id} className="wishlist-card">
              <img src={car.image} alt={car.name} />
              <h3>{car.name}</h3>
              <p>
                {car.km} • {car.fuel} • {car.transmission}
              </p>
              <p>
                <strong>{car.price}</strong>
              </p>
              <p>{car.location}</p>
              <button onClick={() => removeFromWishlist(car.id)}>
                Remove from Wishlist
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
