import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, Button, Dimensions } from "react-native";
import { AppContext } from "../contexts/AppContext";

const { width, height } = Dimensions.get("window"); // Pobieramy wymiary ekranu

export default function DetailsScreen({ route, navigation }) {
  const { place } = route.params; // Odbieranie danych miejsca
  const { savedPlaces = [], addPlace, deletePlace } = useContext(AppContext);

  // Sprawdzenie, czy miejsce jest zapisane
  const isSaved = savedPlaces.some((savedPlace) => savedPlace.id === place.id);

  const handleSavePlace = () => {
    addPlace(place); // Dodanie miejsca do zapisanych
  };

  const handleDeletePlace = () => {
    deletePlace(place.id); // Usunięcie miejsca z zapisanych
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
          color="#FF6347" // Kolor czerwony
        />
      ) : (
        <Button
          title="Zapisz miejsce"
          onPress={handleSavePlace}
          color="#4CAF50" // Kolor zielony
        />
      )}
      <Button
        title="Pokaż na mapie"
        onPress={handleShowOnMap}
        color="#2196F3" // Kolor niebieski
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width > 600 ? 40 : 20, // Większy padding na szerszych ekranach
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: height > 700 ? 300 : 200, // Zwiększamy height na ekranach > 700px
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: width > 600 ? 28 : 24, // Zmiana rozmiaru czcionki przy > 600px
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
