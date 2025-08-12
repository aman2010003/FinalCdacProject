import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Style/UserAppointment.css"; // optional CSS styling
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${config.serverURL}/appointment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => {
        toast.error("Failed to fetch appointments");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div className="appointments-container">
      <h2>My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="appointments-list">
          {appointments.map((appt) => (
            <div key={appt.id} className="appointment-card">
              <h3>{appt.type.replace("_", " ")} Appointment</h3>
              <p>
                <strong>Date:</strong> {appt.appointmentDate}
              </p>
              <p>
                <strong>Time:</strong> {appt.appointmentTime}
              </p>
              <p>
                <strong>Location:</strong> {appt.location}
              </p>
              <p>
                <strong>Status:</strong> {appt.status}
              </p>

              <div className="car-info">
                <p>
                  <strong>Car:</strong> {appt.carBrand} {appt.carModel} (
                  {appt.carVariant})
                </p>
              </div>

              <div className="people-info">
                <p>
                  <strong>Seller:</strong> {appt.sellerName} ({appt.sellerEmail}
                  )
                </p>
                <p>
                  <strong>Buyer:</strong> {appt.buyerName} ({appt.buyerEmail})
                </p>
              </div>

              <p className="created-at">
                Booked on: {new Date(appt.createdAt).toLocaleString()}
              </p>
              <button
                className="btn btn-danger"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Go Back
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAppointments;
