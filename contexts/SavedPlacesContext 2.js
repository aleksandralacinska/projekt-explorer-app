import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SavedPlacesContext = createContext();

export const useSavedPlaces = () => useContext(SavedPlacesContext);

export const SavedPlacesProvider = ({ children }) => {
  const [savedPlaces, setSavedPlaces] = useState([]);

  useEffect(() => {
    (async () => {
      const storedPlaces = JSON.parse(await AsyncStorage.getItem("savedPlaces")) || [];
      setSavedPlaces(storedPlaces);
    })();
  }, []);

  const addPlace = async (place) => {
    const updatedPlaces = [...savedPlaces, place];
    await AsyncStorage.setItem("savedPlaces", JSON.stringify(updatedPlaces));
    setSavedPlaces(updatedPlaces);
  };

  const removePlace = async (placeId) => {
    const updatedPlaces = savedPlaces.filter((item) => item.id !== placeId);
    await AsyncStorage.setItem("savedPlaces", JSON.stringify(updatedPlaces));
    setSavedPlaces(updatedPlaces);
  };

  return (
    <SavedPlacesContext.Provider value={{ savedPlaces, addPlace, removePlace }}>
      {children}
    </SavedPlacesContext.Provider>
  );
};