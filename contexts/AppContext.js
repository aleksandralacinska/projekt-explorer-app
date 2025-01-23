import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [savedPlaces, setSavedPlaces] = useState([]);

  const savePlace = (place) => {
    setSavedPlaces((prev) => [...prev, place]);
  };

  const removePlace = (place) => {
    setSavedPlaces((prev) => prev.filter((p) => p.id !== place.id));
  };

  return (
    <AppContext.Provider value={{ savedPlaces, savePlace, removePlace }}>
      {children}
    </AppContext.Provider>
  );
};