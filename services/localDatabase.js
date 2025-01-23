import AsyncStorage from "@react-native-async-storage/async-storage";

const PLACES_KEY = "saved_places";

export const getPlaces = async () => {
  try {
    const storedPlaces = await AsyncStorage.getItem(PLACES_KEY);
    return storedPlaces ? JSON.parse(storedPlaces) : [];
  } catch (error) {
    console.error("Error retrieving places:", error);
    return [];
  }
};

export const savePlace = async (place) => {
  try {
    const currentPlaces = await getPlaces();
    const updatedPlaces = [...currentPlaces, place];
    await AsyncStorage.setItem(PLACES_KEY, JSON.stringify(updatedPlaces));
    return updatedPlaces;
  } catch (error) {
    console.error("Error saving place:", error);
  }
};

export const removePlace = async (placeId) => {
  try {
    const currentPlaces = await getPlaces();
    const updatedPlaces = currentPlaces.filter((place) => place.id !== placeId);
    await AsyncStorage.setItem(PLACES_KEY, JSON.stringify(updatedPlaces));
    return updatedPlaces;
  } catch (error) {
    console.error("Error removing place:", error);
  }
};