import React, { createContext, useState, useEffect } from "react";
import * as Notifications from "expo-notifications";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [savedPlaces, setSavedPlaces] = useState([]);

  // Funkcja wysyłająca powiadomienie
  const sendNotification = async (placeName) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Miejsce zapisane 🎉",
        body: `${placeName} zostało dodane do zapisanych miejsc!`,
      },
      trigger: null, // Wyślij natychmiast
    });
  };

  const addPlace = (place) => {
    if (!savedPlaces.some((savedPlace) => savedPlace.id === place.id)) {
      setSavedPlaces((prevPlaces) => [...prevPlaces, place]);
      sendNotification(place.name); // Wyślij powiadomienie
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
