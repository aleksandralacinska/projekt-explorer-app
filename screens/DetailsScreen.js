import React from "react";
import { View, Text, StyleSheet, Image, Button, Dimensions } from "react-native";
import { useSavedPlaces } from "../contexts/SavedPlacesContext"; // Nowy kontekst

const { width, height } = Dimensions.get("window");

export default function DetailsScreen({ route, navigation }) {
  const { place } = route.params; // Odbieranie danych miejsca
  const { savedPlaces, addPlace, removePlace } = useSavedPlaces(); // Nowe metody

  // Sprawdzenie, czy miejsce jest już zapisane w Firestore
  const isSaved = savedPlaces.some((savedPlace) => savedPlace.id === place.id);

  const handleSavePlace = () => {
    if (!isSaved) {
      addPlace(place); // Dodanie miejsca do Firestore
    }
  };

  const handleDeletePlace = () => {
    if (isSaved) {
      removePlace(place.id); // Usunięcie miejsca z Firestore
    }
  };

  const handleShowOnMap = () => {
    navigation.navigate("Mapa", { selectedPlace: place });
  };

  return (
    <View style={styles.container}>
      <Image source={place.image} style={styles.image} />
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.description}>{place.description}</Text>

      {isSaved ? (
        <Button
          title="Usuń z zapisanych"
          onPress={handleDeletePlace}
          color="#FF6347" // Czerwony kolor dla usunięcia
        />
      ) : (
        <Button
          title="Zapisz miejsce"
          onPress={handleSavePlace}
          color="#4CAF50" // Zielony kolor dla dodania
        />
      )}

      <Button
        title="Pokaż na mapie"
        onPress={handleShowOnMap}
        color="#2196F3" // Niebieski kolor dla nawigacji do mapy
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width > 600 ? 40 : 20,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: height > 700 ? 300 : 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: width > 600 ? 28 : 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: width > 600 ? 18 : 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
});
