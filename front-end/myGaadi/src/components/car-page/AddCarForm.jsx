import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Style/AddCarForm.css";

const AddCarForm = () => {
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
    registrationNo: "",
    color: "",
    insuranceValid: false,
    fuelType: "",
    transmission: "",
    price: "",
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
    const {
      brand,
      model,
      registrationYear,
      ownership,
      kmDriven,
      location,
      registrationNo,
      color,
      fuelType,
      transmission,
      price,
    } = formValues;

    if (
      !brand ||
      !model ||
      !registrationYear ||
      !ownership ||
      !kmDriven ||
      !location ||
      !registrationNo ||
      !color ||
      !fuelType ||
      !transmission ||
      !price ||
      selectedImages.length === 0
    ) {
      toast.error(
        "Please fill all required fields and upload at least one image."
      );
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
      const response = await fetch("http://localhost:8080/cars/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Car added successfully!");
        setFormValues({
          brand: "",
          model: "",
          registrationYear: "",
          ownership: "",
          kmDriven: "",
          location: "",
          registrationNo: "",
          color: "",
          insuranceValid: false,
          fuelType: "",
          transmission: "",
          price: "",
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
      <ToastContainer />
      <h2>Add New Car</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="form-grid"
      >
        {/* Left Panel: Image Upload */}
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

        {/* Right Panel: Form Fields */}
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
            type="text"
            name="model"
            placeholder="Model"
            value={formValues.model}
            onChange={handleChange}
          />

          <input
            type="number"
            name="registrationYear"
            placeholder="Registration Year (e.g. 2020)"
            value={formValues.registrationYear}
            onChange={handleChange}
            min="1990"
            max={new Date().getFullYear()}
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
            type="text"
            name="registrationNo"
            placeholder="Registration No."
            value={formValues.registrationNo}
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

          <button type="submit">Add Car</button>
        </div>
      </form>
    </div>
  );
};

export default AddCarForm;
