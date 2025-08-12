import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Style/AddCarForm.css";
import { config } from "../../config";
const UpdateCarForm = () => {
  const { carId } = useParams();
  console.log("UpdateCarForm ID:", carId);

  const navigate = useNavigate();

 const brands = [
    "Maruti Suzuki",
    "Hyundai",
    "Renault",
    "Honda",
    "Tata",
    "Kia",
    "Mahindra",
    "Volkswagen",
    "Skoda",
    "Ford",
    "Mg Motors",
    "Audi",
    "BMW",
    "Mercedes-Benz",
    "Toyota",
    "Nissan",
    "Chevrolet",
    "Datsun",
    "Jeep",
    "Volvo",
    "Porsche",
    "Land Rover",
    "Jaguar",
    "Fiat",
    "Mitsubishi",
    "Isuzu",
    "lamborghini",
    "Ferrari",
    "others",
  ];

  const locations = [
    "Ahmedabad",
    "Bangalore",
    "Chennai",
    "Delhi NCR",
    "Gurgaon",
    "Hyderabad",
    "Jaipur",
    "Kolkata",
    "Mumbai",
    "New Delhi",
    "Noida",
    "Pune",
  ];

  const [formValues, setFormValues] = useState({
    brand: "",
    model: "",
    registrationYear: "",
    ownership: "",
    kmDriven: "",
    location: "",
    registrationNumber: "",
    color: "",
    insuranceValid: false,
    fuelType: "",
    transmission: "",
    price: "",
    description: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`${config.serverURL}/cars/${carId}`);
        if (response.ok) {
          const data = await response.json();
          setFormValues(data);
          setPreviewUrls(
            data.images?.map(
              (img) => `${config.serverURL}images/${img.fileName}`
            ) || []
          );
        } else {
          toast.error("Failed to load car data.");
        }
      } catch (error) {
        toast.error("Error fetching car data.");
      }
    };

    fetchCar();
  }, [carId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("car", JSON.stringify(formValues));
    selectedImages.forEach((file) => formData.append("images", file));

    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(
        `${config.serverURL}/cars/update/${carId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Car updated successfully!");
        setTimeout(() => navigate("/home/MyVehicles"), 2000);
      } else {
        const err = await response.json();
        toast.error("Failed to update car: " + err.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="add-car-form">
      <h2>Update Car</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="form-grid"
      >
        <div className="left-panel">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="image-input"
          />
          {previewUrls.length > 0 && (
            <div className="preview-container">
              {previewUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`preview-${idx}`}
                  className="preview-img"
                />
              ))}
            </div>
          )}
        </div>
        <div className="right-panel">
          <select name="brand" value={formValues.brand} onChange={handleChange}>
            <option value="">Select Brand</option>
            {brands.map((brand, i) => (
              <option key={i} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          <input
           
            name="model"
            placeholder="Model"
            value={formValues.model}
            onChange={handleChange}
          />

          <input
            type="number"
            name="registrationYear"
            placeholder="Year"
            value={formValues.registrationYear}
            onChange={handleChange}
          />

          <select
            name="ownership"
            value={formValues.ownership}
            onChange={handleChange}
          >
            <option value="">Ownership</option>
            <option value="FIRST">1st Hand</option>
            <option value="SECOND">2nd Hand</option>
            <option value="THIRD">3rd Hand</option>
            <option value="FOURTH_OR_MORE">4th or More</option>
          </select>

          <input
            type="number"
            name="kmDriven"
            placeholder="KM Driven"
            value={formValues.kmDriven}
            onChange={handleChange}
          />

          <select
            name="location"
            value={formValues.location}
            onChange={handleChange}
          >
            <option value="">Select Location</option>
            {locations.map((loc, i) => (
              <option key={i} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <input
           
            name="registrationNumber"
            placeholder="Registration No."
            value={formValues.registrationNumber}
            onChange={handleChange}
          />

          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formValues.color}
            onChange={handleChange}
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="insuranceValid"
              checked={formValues.insuranceValid}
              onChange={handleChange}
            />
            Insurance Valid
          </label>

          <select
            name="fuelType"
            value={formValues.fuelType}
            onChange={handleChange}
          >
            <option value="">Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>

          <select
            name="transmission"
            value={formValues.transmission}
            onChange={handleChange}
          >
            <option value="">Transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formValues.price}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formValues.description}
            onChange={handleChange}
          />

          <button type="submit">Update Car</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCarForm;
