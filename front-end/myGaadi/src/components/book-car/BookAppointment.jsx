import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "../../Style/BookAppointment.css";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";
const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    location: "",
    appointmentDate: "",
    appointmentTime: "",
    type: "TEST_DRIVE", // default value
  });
  const { carId } = useParams();
  const token = sessionStorage.getItem("token");
  const appointmentTypes = ["TEST_DRIVE", "SERVICE", "INSPECTION"]; // adjust to match your backend
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const appointmentData = {
        location: formData.location,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        type: formData.type,
      };

      await axios.post(
        `${config.serverURL}/appointment/${carId}`,
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Appointment was booked");
      navigate("/home")
      
    } catch (error) {
      console.error(error);

      if (error.response) {
        const { message } = error.response.data;
        toast.error(`${message}`);
      } else {
        toast.error("An error occurred while booking.");
      }
    }
  };

  return (
    <div className="appointment-form-container">
      <form className="appointment-form" onSubmit={handleSubmit}>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Appointment Date:</label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Appointment Time:</label>
          <input
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Appointment Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            {appointmentTypes.map((type, index) => (
              <option key={index} value={type}>
                {type.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
