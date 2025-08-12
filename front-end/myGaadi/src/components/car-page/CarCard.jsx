import React, { useState, useEffect } from "react";
import {
  getAllCars,
  filterCars,
  getAllBrands,
  getAllCities,
} from "../services/carService";
import "../Style/Filter.css";
import Select from "react-select";

const CarCard = ({ car }) => (
  <div className="vehicle-card">
    <div className="thumb-gallery">
      <img
        className="first"
        src={`https://via.placeholder.com/300x180.png?text=${car.brand}+${car.model}`}
        alt={`${car.brand} ${car.model}`}
      />
      <img
        className="second"
        src={`https://via.placeholder.com/300x180.png?text=${car.brand}+${car.model}+Interior`}
        alt={`${car.brand} ${car.model} Interior`}
      />
    </div>
    <div className="info">
      <h3>
        {car.brand} {car.model} ({car.registrationYear})
      </h3>
      <div className="price">
        <span>Price Starting at</span>
        <h4>₹{car.price.toLocaleString("en-IN")}</h4>
      </div>
      <div className="desc">
        <p>
          {car.brand} {car.model} - {car.fuelType},{" "}
          {car.kmDriven.toLocaleString("en-IN")} km driven.
        </p>
      </div>
      <div className="specs">
        <div className="spec mpg">
          <span>KM Driven</span>
          <p>
            {car.kmDriven.toLocaleString("en-IN")}
            <span> km</span>
          </p>
        </div>
        <div className="spec mpg">
          <span>Fuel</span>
          <p>{car.fuelType}</p>
        </div>
        <div className="spec mpg">
          <span>Location</span>
          <p>{car.location}</p>
        </div>
      </div>
    </div>
  </div>
);

const FilterPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brands, setBrands] = useState([]);
  const [cities, setCities] = useState([]);
  const [filters, setFilters] = useState({
    brand: [],
    location: [],
    fuelType: "",
    ownership: "",
    minYear: "",
    maxYear: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = () => {
    setLoading(true);
    setError(null);
    Promise.all([getAllCars(), getAllBrands(), getAllCities()])
      .then(([carsResponse, brandsResponse, citiesResponse]) => {
        setCars(carsResponse.data);
        setBrands(
          brandsResponse.data.map((brand) => ({ value: brand, label: brand }))
        );
        setCities(
          citiesResponse.data.map((city) => ({ value: city, label: city }))
        );
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFilterChange = (name, selectedOptions) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    filterCars(filters)
      .then((response) => {
        setCars(response.data);
      })
      .catch((err) => {
        console.error("Error filtering cars:", err);
        setError("Failed to apply filters. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleResetFilters = () => {
    setFilters({
      brand: [],
      location: [],
      fuelType: "",
      ownership: "",
      minYear: "",
      maxYear: "",
      minPrice: "",
      maxPrice: "",
    });
    fetchInitialData();
  };

  return (
    <div className="filter-page-container">
      {/* Filter Sidebar */}
      <aside className="filter-sidebar">
        <h3>Filter Cars</h3>
        <form onSubmit={handleFilterSubmit}>
          <div className="filter-group">
            <label htmlFor="brand">Brand</label>
            <Select
              isMulti
              name="brand"
              options={brands}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(selectedOptions) =>
                handleFilterChange("brand", selectedOptions)
              }
              value={filters.brand.map((b) => ({ value: b, label: b }))}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="location">Location</label>
            <Select
              isMulti
              name="location"
              options={cities}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(selectedOptions) =>
                handleFilterChange("location", selectedOptions)
              }
              value={filters.location.map((c) => ({ value: c, label: c }))}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="fuelType">Fuel Type</label>
            <select
              id="fuelType"
              name="fuelType"
              value={filters.fuelType}
              onChange={handleInputChange}
            >
              <option value="">Any</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="CNG">CNG</option>
              <option value="Electric">Electric</option>
              <option value="LPG">LPG</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="ownership">Ownership</label>
            <select
              id="ownership"
              name="ownership"
              value={filters.ownership}
              onChange={handleInputChange}
            >
              <option value="">Any</option>
              <option value="FIRST">First</option>
              <option value="SECOND">Second</option>
              <option value="THIRD">Third</option>
              <option value="FOURTH_OR_MORE">Fourth or More</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="priceRange">Price Range (₹)</label>
            <div className="price-range">
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleInputChange}
                placeholder="Min"
              />
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleInputChange}
                placeholder="Max"
              />
            </div>
          </div>
          <div className="filter-group">
            <label htmlFor="yearRange">Year Range</label>
            <div className="year-range">
              <input
                type="number"
                id="minYear"
                name="minYear"
                value={filters.minYear}
                onChange={handleInputChange}
                placeholder="Min"
              />
              <input
                type="number"
                id="maxYear"
                name="maxYear"
                value={filters.maxYear}
                onChange={handleInputChange}
                placeholder="Max"
              />
            </div>
          </div>
          <div className="filter-buttons">
            <button type="submit" className="btn-filter">
              Apply Filters
            </button>
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn-reset"
            >
              Reset
            </button>
          </div>
        </form>
      </aside>

      {/* Results Section */}
      <main className="results-container">
        {loading && (
          <p className="status-message loading-animation">Loading cars...</p>
        )}
        {error && <p className="status-message error-message">{error}</p>}
        {!loading && !error && (
          <>
            {cars.length > 0 ? (
              <div className="car-grid">
                {cars.map((car) => (
                  <CarCard key={car.carId} car={car} />
                ))}
              </div>
            ) : (
              <p className="status-message no-results">
                No cars found matching your criteria.
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default FilterPage;
