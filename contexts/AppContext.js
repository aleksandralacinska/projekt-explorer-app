import React, { createContext, useState, useEffect } from "react";
import { getPlaces, savePlace, removePlace } from "../services/localDatabase";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [savedPlaces, setSavedPlaces] = useState([]);

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await getPlaces();
      setSavedPlaces(places);
    };
    loadPlaces();
  }, []);

  const addPlace = async (place) => {
    const updatedPlaces = await savePlace(place);
    setSavedPlaces(updatedPlaces);
  };

  const deletePlace = async (placeId) => {
    const updatedPlaces = await removePlace(placeId);
    setSavedPlaces(updatedPlaces);
  };

  return (
    <AppContext.Provider value={{ savedPlaces, addPlace, deletePlace }}>
      {children}
    </AppContext.Provider>
  );
};