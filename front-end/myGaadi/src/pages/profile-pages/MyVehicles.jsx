import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";
const MyVehicles = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("Token:", token); // ✅ Check if token exists

    axios
      .get(`${config.serverURL}/cars/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Fetched cars:", res.data); // ✅ Debug
        setCars(res.data);
      })
      .catch((err) => console.error("Error fetching your cars:", err));
  }, []);

  const deleteCar = (carId) => {
    axios
      .delete(`${config.serverURL}/cars/${carId}`)
      .then(() => {
        toast.success("Car was removed successfully");
        setCars((prevCars) => prevCars.filter((car) => car.carId !== carId));
      })
      .catch((ex) => {
        console.error("error", ex);
      });
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Listed Vehicles</h3>
      {cars.length === 0 ? (
        <p>No vehicles listed yet.</p>
      ) : (
        <div className="row g-3">
          {cars.map((car) => (
            <div key={car.carId} className="col-md-4">
              <div className="card">
                {car.images.length > 0 && (
                  <img
                    src={`data:image/jpeg;base64,${car.images[0].imagebase64}`}
                    className="card-img-top"
                    alt="Car"
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">
                    {car.brand} {car.model}
                  </h5>
                  <p className="card-text">
                    ₹{car.price?.toLocaleString()} <br />
                    {car.registrationYear} • {car.kmDriven} km
                  </p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        if (car.carId) {
                          navigate(`/home/updatecar/${car.carId}`);
                        } else {
                          toast.error("Car ID is missing");
                        }
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteCar(car.carId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVehicles;
