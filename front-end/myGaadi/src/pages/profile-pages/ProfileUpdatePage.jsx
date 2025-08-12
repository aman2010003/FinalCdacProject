// src/pages/ProfileUpdatePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Style/ProfileUpdate.css";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";
import { toast } from "react-toastify";
const ProfileUpdatePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await axios.get(`${config.serverURL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (err) {
        console.error("Failed to load profile", err);
        alert("Failed to load profile. Please try again.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    try {
      await axios.put(`${config.serverURL}/api/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

     
      toast.success("Profile updated successfully");
      navigate("/home/profile");
    } catch (error) {
      console.error("Update error:", error);

      if (error.response) {
        alert(error.response.data); // Backend string message like "Email already in use"
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="profile-update-container">
      <form className="profile-update-form" onSubmit={handleSubmit}>
        <h2>Update Your Profile</h2>

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileUpdatePage;
