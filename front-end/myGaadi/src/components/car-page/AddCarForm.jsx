import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Style/AddCarForm.css";
import { config } from "../../config";

const AddCarForm = () => {
  const brands = [
    "Maruti Suzuki", "Hyundai", "Renault", "Honda", "Tata", "Kia", "Mahindra",
    "Volkswagen", "Skoda", "Ford", "Mg Motors", "Audi", "BMW", "Mercedes-Benz",
    "Toyota", "Nissan", "Chevrolet", "Datsun", "Jeep", "Volvo", "Porsche",
    "Land Rover", "Jaguar", "Fiat", "Mitsubishi", "Isuzu", "Lamborghini", "Ferrari","Fortuner", "Others",
  ];

  const locations = [
    "Ahmedabad", "Bangalore", "Chennai", "Delhi NCR", "Gurgaon", "Hyderabad",
    "Jaipur", "Kolkata", "Mumbai", "New Delhi", "Noida", "Pune",
  ];

  const [formValues, setFormValues] = useState({
    brand: "", model: "", registrationYear: "", ownership: "", kmDriven: "",
    location: "", registrationNo: "", color: "", insuranceValid: false,
    fuelType: "", transmission: "", price: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

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

  const validateForm = () => {
    const requiredFields = [
      "brand", "model", "registrationYear", "ownership", "kmDriven",
      "location", "registrationNo", "color", "fuelType", "transmission", "price"
    ];
    for (let field of requiredFields) {
      if (!formValues[field]) {
        toast.error(`Please fill the ${field} field.`);
        return false;
      }
    }
    if (selectedImages.length === 0) {
      toast.error("Please upload at least one image.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("car", JSON.stringify(formValues));
    selectedImages.forEach((file) => formData.append("images", file));

    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(`${config.serverURL}/cars/add`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        toast.success("Car added successfully!");
        setFormValues({
          brand: "", model: "", registrationYear: "", ownership: "", kmDriven: "",
          location: "", registrationNo: "", color: "", insuranceValid: false,
          fuelType: "", transmission: "", price: "",
        });
        setSelectedImages([]);
        setPreviewUrls([]);
      } else {
        const errorData = await response.json();
        toast.error("Failed to add car: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong while uploading the car.");
    }
  };

  return (
    <div className="add-car-form">
      <h2>Add New Car</h2>
      <form onSubmit={handleSubmit} className="form-grid" encType="multipart/form-data">

        {/* Left Panel: Image Upload */}
        <div className="left-panel">
          <label className="form-label">Upload Images</label>
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
                <img key={idx} src={url} alt={`preview-${idx}`} className="preview-img" />
              ))}
            </div>
          )}
        </div>

        {/* Right Panel: Car Details */}
        <div className="right-panel">
          <label>Brand</label>
          <select name="brand" value={formValues.brand} onChange={handleChange}>
            <option value="">Select Brand</option>
            {brands.map((brand, i) => (
              <option key={i} value={brand}>{brand}</option>
            ))}
          </select>

          <label>Model</label>
          <input name="model" value={formValues.model} onChange={handleChange} placeholder="e.g. Swift Dzire" />

          <label>Registration Year</label>
          <input type="number" name="registrationYear" min="1990" max={new Date().getFullYear()} value={formValues.registrationYear} onChange={handleChange} />

          <label>Ownership</label>
          <select name="ownership" value={formValues.ownership} onChange={handleChange}>
            <option value="">Select Ownership</option>
            <option value="FIRST">1st Hand</option>
            <option value="SECOND">2nd Hand</option>
            <option value="THIRD">3rd Hand</option>
            <option value="FOURTH_OR_MORE">4th or More</option>
          </select>

          <label>KM Driven</label>
          <input type="number" name="kmDriven" value={formValues.kmDriven} onChange={handleChange} />

          <label>Location</label>
          <select name="location" value={formValues.location} onChange={handleChange}>
            <option value="">Select Location</option>
            {locations.map((loc, i) => (
              <option key={i} value={loc}>{loc}</option>
            ))}
          </select>

          <label>Registration No.</label>
          <input  name="registrationNo" value={formValues.registrationNo} onChange={handleChange} />

          <label>Color</label>
          <input name="color" value={formValues.color} onChange={handleChange} />

          <label className="checkbox-label">
            <input type="checkbox" name="insuranceValid" checked={formValues.insuranceValid} onChange={handleChange} />
            Insurance Valid
          </label>

          <label>Fuel Type</label>
          <select name="fuelType" value={formValues.fuelType} onChange={handleChange}>
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>

          <label>Transmission</label>
          <select name="transmission" value={formValues.transmission} onChange={handleChange}>
            <option value="">Select Transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>

          <label>Price</label>
          <input type="number" name="price" value={formValues.price} onChange={handleChange} />

          <button type="submit">Add Car</button>
        </div>
      </form>
    </div>
  );
};

export default AddCarForm;
