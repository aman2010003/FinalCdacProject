import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/ProfilePage.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import { useContext } from "react";
import { config } from "../config";

const ProfilePage = () => {
  //get the navigate() function reference
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
  });

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
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-icon">{userData.name.charAt(0)}</div>
          <div className="profile-details">
            <h2>{userData.name}</h2>
            <p>{userData.phone}</p>
            <a href="#">
              {userData.email || "Link your email or social account"}
            </a>
          </div>
        </div>

        <div className="profile-options">
          <button onClick={() => navigate("/home/AddCar")}>
            Sell Your Vehicles
          </button>
          <button onClick={() => navigate("/home/Myvehicles")}>
            My Vehicles
          </button>
          <button onClick={() => navigate("/home/MyWishList")}>
            Shortlisted Vehicles
          </button>
          <button onClick={() => navigate("/home/myorder")}>My Orders</button>
          <button onClick={() => navigate("/home/manage")}>
            Manage Consents
          </button>
          <button onClick={() => navigate("/home/ProfileUpdate")}>
            Profile Settings
          </button>
        </div>

        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
