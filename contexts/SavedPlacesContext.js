import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import Firestore

const SavedPlacesContext = createContext();

export const useSavedPlaces = () => useContext(SavedPlacesContext);

export const SavedPlacesProvider = ({ children }) => {
  const [savedPlaces, setSavedPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "savedPlaces"));
        const places = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        // Usuń duplikaty na podstawie ID
        const uniquePlaces = Array.from(new Map(places.map((item) => [item.id, item])).values());
  
        setSavedPlaces(uniquePlaces);
      } catch (error) {
        console.error("Błąd pobierania miejsc:", error);
      }
    };
    fetchPlaces();
  }, []);

  const addPlace = async (place) => {
    try {
      // Sprawdzenie, czy miejsce już istnieje w zapisanych
      const isDuplicate = savedPlaces.some((p) => p.id === place.id);
      if (isDuplicate) {
        console.log("To miejsce już jest zapisane:", place);
        return;
      }
  
      // Dodaj miejsce do Firestore
      const docRef = await addDoc(collection(db, "savedPlaces"), place);
      
      setSavedPlaces((prevPlaces) => [...prevPlaces, { id: docRef.id, ...place }]);
  
      // Zapisz w AsyncStorage
      await AsyncStorage.setItem("savedPlaces", JSON.stringify([...savedPlaces, place]));
    } catch (error) {
      console.error("Błąd dodawania miejsca:", error);
    }
  };

  const removePlace = async (placeId) => {
    try {
      await deleteDoc(doc(db, "savedPlaces", placeId));
      const updatedPlaces = savedPlaces.filter((item) => item.id !== placeId);
      setSavedPlaces(updatedPlaces);

      await AsyncStorage.setItem("savedPlaces", JSON.stringify(updatedPlaces));
    } catch (error) {
      console.error("Błąd usuwania miejsca:", error);
    }
  };

  console.log("Children w SavedPlacesProvider:", children); // Debugowanie

  return (
    <SavedPlacesContext.Provider value={{ savedPlaces, addPlace, removePlace }}>
      {children}
    </SavedPlacesContext.Provider>
  );
  
};
