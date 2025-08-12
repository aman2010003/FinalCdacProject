import React, { useEffect, useState } from "react";
import "../Style/ShortlistedVehicles.css";
import { useShortlist } from "../contexts/ShortlistContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import { useContext } from "react";
import { config } from "../config";
const ShortlistedVehicles = () => {
  const { shortlisted, removeFromShortlist } = useShortlist();
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const onLogout = () => {
    //remove all the caches values from session Storage
    sessionStorage.removeItem("Name");
    sessionStorage.removeItem("token");

    //reset the user details in AuthContext
    setUser(null);

    //navigate to Login Screen

    navigate("/");
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get(`${config.serverURL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name, phone, email } = response.data;
        setUserData({ name, phone, email });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="shortlist-container">
      <aside className="sidebar">
        <div className="profile-section">
          <div className="avatar">{userData.name.charAt(0)}</div>
          <div className="user-info-column">
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Phone:</strong> {userData.phone}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {userData.email || "Link your e-mail or social account"}
            </p>
          </div>
        </div>
        <nav className="nav-menu">
          <button onClick={() => navigate("/home/AddCar")}>
            Sell Your Vehicles
          </button>
          <button onClick={() => navigate("/home/Myvehicles")}>
            My Vehicles
          </button>

          <button onClick={() => navigate("/home/myorder")}>My Orders</button>
          <button onClick={() => navigate("/home/manage")}>
            Manage Consents
          </button>
          <button onClick={() => navigate("/home/ProfileUpdate")}>
            Profile Settings
          </button>
        </nav>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </aside>

      <main className="main-content">
        <h2>Shortlisted</h2>
        <p>
          {shortlisted.length} item{shortlisted.length !== 1 ? "s" : ""} are
          shortlisted, you can explore them
        </p>
        <div className="vehicle-list">
          {shortlisted.length === 0 ? (
            <div className="empty-message">No vehicles shortlisted.</div>
          ) : (
            shortlisted.map((v, index) => (
              <div className="vehicle-card" key={index}>
                <div className="vehicle-tag">{v.tag}</div>
                {v.images && v.images.length > 0 ? (
                  <img
                    src={`data:image/jpeg;base64,${v.images[0].imagebase64}`}
                    alt="car"
                    className="vehicle-image"
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <h3>
                  {v.brand} {v.model}
                </h3>
                <p>
                  {v.registrationYear} • {v.fuelType} • {v.transmission}
                </p>
                <p>
                  {v.kmDriven} km • {v.ownership} Owner
                </p>
                <p className="price">₹{v.price?.toLocaleString()}</p>
                <div className="card-actions">
                  <button
                    className="check-now"
                    onClick={() => navigate(`/home/cars/${v.carId}`)}
                  >
                    Check Now ➤
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromShortlist(v.carId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ShortlistedVehicles;
