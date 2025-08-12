import React from "react";
import "../../Style/homepage/PopularBrands.css";
import Maruti from "../../assets/CarBrandLogo/Maruti-Suzuki-Logo.png";
import Hyundai from "../../assets/CarBrandLogo/Hyundai.jpg";
import Honda from "../../assets/CarBrandLogo/Honda.png";
import Tata from "../../assets/CarBrandLogo/Tata.jpg";
import Kia from "../../assets/CarBrandLogo/Kia.png";
import Renault from "../../assets/CarBrandLogo/Renault.jpg";
import Mahindra from "../../assets/CarBrandLogo/mahindra.png";
import Volkswagen from "../../assets/CarBrandLogo/Volkswagen.png";
import Skoda from "../../assets/CarBrandLogo/Skoda.jpg";
import Ford from "../../assets/CarBrandLogo/Ford.png";
import MgMotors from "../../assets/CarBrandLogo/Mg.png";
import Audi from "../../assets/CarBrandLogo/audi-logo.png";
import BMW from "../../assets/CarBrandLogo/bmw-logo.png";
import Mercedes from "../../assets/CarBrandLogo/mercedes-benz-logo.png";
import Nissan from "../../assets/CarBrandLogo/nissan-logo.png";
import Porsche from "../../assets/CarBrandLogo/porsche-logo.png";
import Jaguar from "../../assets/CarBrandLogo/jaguar-logo.png"
import Tesla from "../../assets/CarBrandLogo/tesla-logo.png";
import Lamborghini from "../../assets/CarBrandLogo/lamborghini-logo.png";
import Ferrari from "../../assets/CarBrandLogo/ferrari-logo.png";
import toyota from "../../assets/CarBrandLogo/toyota-logo.png";
import { useNavigate } from "react-router-dom";
const PopularBrands = () => {
  const navigate = useNavigate();
  const brands = [
    {
      name: "Maruti Suzuki",
      count: "110+ cars",
      logo: Maruti,
    },
    {
      name: "Hyundai",
      count: "50+ cars",
      logo: Hyundai,
    },
    {
      name: "Renault",
      count: "20+ cars",
      logo: Renault,
    },
    { name: "Honda", count: "20+ cars", logo: Honda },
    { name: "Tata", count: "20+ cars", logo: Tata },
    { name: "Kia", count: "10+ cars", logo: Kia },
    {
      name: "Mahindra",
      count: "10+ cars",
      logo: Mahindra,
    },
    {
      name: "Volkswagen",
      count: "10+ cars",
      logo: Volkswagen,
    },
     {
      name: "Mercedes-Benz",
      count: "10+ cars",
      logo: Mercedes,
    },
     {
      name: "BMW",
      count: "5+ cars",
      logo: BMW,
    },
     {
      name: "Audi",
      count: "10+ cars",
      logo: Audi,
    },
    {
      name: "Toyota",
      count: "10+ cars",
      logo: toyota,
    },
      {
      name: "Nissan",
      count: "10+ cars",
      logo: Nissan,
    },

      {
      name: "Porsche",
      count: "10+ cars",
      logo: Porsche,
    },
      {
      name: "Jaguar",
      count: "10+ cars",
      logo: Jaguar,
    },
      {
      name: "Tesla",
      count: "10+ cars",
      logo: Tesla,
    },
      {
      name: "lamborghini",
      count: "10+ cars",
      logo: Lamborghini,
    },
      {
      name: "Ferrari",
      count: "10+ cars",
      logo: Ferrari,
    },
    { name: "Skoda", count: "9 cars", logo: Skoda },
    { name: "Ford", count: "8 cars", logo: Ford },
    { name: "Mg Motors", count: "3 cars", logo: MgMotors },
  ];

  return (
    <div className="brands-container">
      <h2 className="brands-heading">Explore Popular Brands</h2>
      <div className="brands-grid">
        {brands.map((brand, index) => (
          <div
            className="brand-card"
            key={index}
            onClick={() => {
              navigate(`/Home/Filtercar`, { state: { brand } });
            }}
          >
            {brand.name}
            <img src={brand.logo} alt={brand.name} className="brand-logo" />
            <div className="brand-info">
              <p className="brand-name">{brand.name}</p>
              {brand.count && <p className="brand-count">{brand.count}</p>}
            </div>
          </div>
        ))}
      </div>
      <button onClick={()=>navigate("/home/AllCar")} className="view-all-brands">View all cars</button>
    </div>
  );
};

export default PopularBrands;
