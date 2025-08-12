import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Style/UserAppointment.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";
const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");
  const [status, setStatus] = useState(["PENDING", "CONFIRMED", "CANCELLED"]);
  const [selectedStatusMap, setSelectedStatusMap] = useState({});
  const navigate = useNavigate();

  const handleclick = (id, status) => {
    axios
      .put(
        `${config.serverURL}/appointment/update/${id}`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {toast.success("Appointment updated")
        navigate("/home");
      })
      .catch((err) => {
        toast.error("Failed to update");
        console.error(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${config.serverURL}/appointment/manage`, {
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
      <h2>Manage Appointments</h2>

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

              <div>
                <label>
                  <strong>Appointment Status:</strong>
                </label>
                <select
                  value={selectedStatusMap[appt.id] || appt.status}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedStatusMap((prev) => ({
                      ...prev,
                      [appt.id]: value,
                    }));
                  }}
                >
                  {status.map((type, index) => (
                    <option key={index} value={type}>
                      {type.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

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
              <div className="button-bar">
                <button
                  className="btn btn-danger"
                  onClick={() => window.history.back()}
                >
                  ⬅ Back
                </button>
                <button
                  className="btn btn-success"
                  onClick={() =>
                    handleclick(
                      appt.id,
                      selectedStatusMap[appt.id] || appt.status
                    )
                  }
                >
                  🔄 Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageAppointments;
