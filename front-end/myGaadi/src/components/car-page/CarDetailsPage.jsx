import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Style/CarDetails.css";
import { toast } from "react-toastify";
import { config } from "../../config";
const CarDetailPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const token = sessionStorage.getItem("token")
  
  
  useEffect(() => {
    axios
      .get(`${config.serverURL}/cars/${carId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCar(res.data);
      })
      .catch((err) => console.error(err));
  }, [carId]);

  const toggleWishlist = () => {
    setWishlist((prev) => !prev);
    axios
      .post(`${config.serverURL}/api/favorites/3/${carId}`)
      .then((res) => {
        if (res.status === 200) {
          alert("Car was added to wishlist");
        } else {
          console.warn("Unexpected response:", res.status);
        }
      })
      .catch((err) => console.error("Error adding to wishlist:", err));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + car.images.length) % car.images.length
    );
  };

  const handleClick =()=>{
    axios.post(`${config.serverURL}/inquiries/send`,{
      fromUserId: 1,
    carId: carId,
    message: "wanana contact"}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res=>{
      console.log(res.data)
      if(res!=null)
      {
        toast.success(
          <div style={{ lineHeight: "1.5" }}>
            {res.data.message.split(",").map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        ,{
          autoClose: 20000,
        }) 
      }
    })
    
  }

  if (!car) return <div className="text-center mt-5 fs-4">Loading...</div>;

  return (
    <div className="container mt-5 car-detail-container">
      <div className="row g-4">
        {/* Image Section */}
        <div className="col-md-5">
          <div className="image-wrapper">
            <img
              src={`data:image/jpeg;base64,${car.images[currentImageIndex]?.imagebase64}`}
              alt="Car"
              className="car-image"
            />

            {car.images.length > 1 && (
              <>
                <button className="image-nav-button left" onClick={prevImage}>
                  <i className="bi bi-chevron-left fs-5" />
                </button>
                <button className="image-nav-button right" onClick={nextImage}>
                  <i className="bi bi-chevron-right fs-5" />
                </button>
              </>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-start mt-4">
            <h5>Description</h5>
            {/* <button className="btn btn-link p-0" onClick={toggleWishlist}>
              <i
                className={`bi ${
                  wishlist ? "bi-heart-fill text-danger" : "bi-heart text-muted"
                } fs-3`}
              />
            </button> */}
          </div>

          <div className="car-description-box mb-3">{car.description}</div>

          <div className="car-detail-buttons d-flex gap-3 flex-wrap mt-3">
            <button
              onClick={() => navigate(`/home/book/${car.carId}`)}
              className="btn btn-primary"
            >
              <i className="bi bi-calendar-check me-2"></i>Book Car
            </button>
            <button className="btn btn-success"  onClick={handleClick}>
              <i className="bi bi-telephone me-2"></i>Contact Dealer
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left me-2"></i>Go Back
            </button>
          </div>
        </div>

        {/* Car Details Table */}
        <div className="col-md-7">
          <h4 className="car-info-heading">
            {car.brand} {car.model} - {car.variant}
          </h4>
          <table className="table table-bordered table-sm mt-3 fs-5">
            <tbody>
              <tr>
                <th>Registration Year</th>
                <td>{car.registrationYear}</td>
              </tr>
              <tr>
                <th>Ownership</th>
                <td>{car.ownership}</td>
              </tr>
              <tr>
                <th>KM Driven</th>
                <td>{car.kmDriven} km</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{car.location}</td>
              </tr>
              <tr>
                <th>Registration No.</th>
                <td>{car.registrationNumber}</td>
              </tr>
              <tr>
                <th>Color</th>
                <td>{car.color}</td>
              </tr>
              <tr>
                <th>Insurance Valid</th>
                <td>{car.insuranceValid ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <th>Fuel Type</th>
                <td>{car.fuelType}</td>
              </tr>
              <tr>
                <th>Transmission</th>
                <td>{car.transmission}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>₹{car.price?.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Listed On</th>
                <td>{new Date(car.createdAt).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
