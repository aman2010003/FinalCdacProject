import { config } from "../../config";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Style/ProfileUpdate.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const AdminUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        status: "",
        type: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const token = sessionStorage.getItem("token");
            try {
                const response = await axios.get(`${config.serverURL}/users/admin/${id}`,  {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
                setFormData(response.data)
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
            await axios.put(`${config.serverURL}/users/${id}`, formData,   {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

            toast.success("Profile updated successfully");
            navigate(-1);
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
                    value={formData.phoneNo}
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

                <label>Status</label>
                <select class="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                </select>

                <label>Type</label>
               <select class="form-select"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                    </select>
                    <div style={{marginTop:"15px"}}>
                <button className="btn btn-submit" type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default AdminUpdate;
