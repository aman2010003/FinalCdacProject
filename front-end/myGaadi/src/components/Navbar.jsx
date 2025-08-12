import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import { FaHeart, FaUserCircle } from "react-icons/fa";
import "../Style/Navbar.css";
import carLogo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const onLogout = () => {
    sessionStorage.removeItem("Name");
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <button className="navbar__logo-btn" onClick={() => navigate("/home")}>
          <img src={carLogo} alt="MyGaadi Logo" className="navbar__logo" />
        </button>
        <div className="navbar__brand">
          <span className="navbar__tagline">BADHTE INDIA KA BHAROSA</span>
        </div>
      </div>

      <div className="navbar__right">
        {sessionStorage.getItem("userType") === "ADMIN" && (
          <button className="btn btn-primary" onClick={() => navigate("/home/admin/")}>
            Admin Panel
          </button>
        )}

        <button className="navbar__logout" onClick={onLogout}>
          Logout
        </button>

        <FaHeart
          className="navbar__wishlist-icon"
          onClick={() => navigate("/home/MyWishList")}
        />

        <FaUserCircle
          className="navbar__profile-icon"
          onClick={() =>
             navigate("/home/Profile")}
        />
      </div>
    </nav>
  );
}

export default Navbar;
