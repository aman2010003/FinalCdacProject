import React, { createContext, useState, useContext } from "react";

const ShortlistContext = createContext();

export const ShortlistProvider = ({ children }) => {
  const [shortlisted, setShortlisted] = useState([]);

  const addToShortlist = (car) => {
    setShortlisted((prev) =>
      prev.find((c) => c.carId === car.carId) ? prev : [...prev, car]
    );
  };

  const removeFromShortlist = (carId) => {
    setShortlisted((prev) => prev.filter((c) => c.carId !== carId));
  };

  return (
    <ShortlistContext.Provider
      value={{ shortlisted, addToShortlist, removeFromShortlist }}
    >
      {children}
    </ShortlistContext.Provider>
  );
};

export const useShortlist = () => useContext(ShortlistContext);
