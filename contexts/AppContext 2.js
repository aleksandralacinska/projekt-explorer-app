import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [savedPlaces, setSavedPlaces] = useState([]);

  const addPlace = (place) => {
    if (!savedPlaces.some((savedPlace) => savedPlace.id === place.id)) {
      setSavedPlaces((prevPlaces) => [...prevPlaces, place]);
    }
  };

  const deletePlace = (placeId) => {
    setSavedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== placeId)
    );
  };

  return (
    <AppContext.Provider value={{ savedPlaces, addPlace, deletePlace }}>
      {children}
    </AppContext.Provider>
  );
};