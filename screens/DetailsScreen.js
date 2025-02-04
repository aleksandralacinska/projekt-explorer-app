import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { AppContext } from "../contexts/AppContext";

const { width, height } = Dimensions.get("window");

export default function DetailsScreen({ route, navigation }) {
  const { place } = route.params;
  const { savedPlaces = [], addPlace, deletePlace } = useContext(AppContext);

  const isSaved = savedPlaces.some((savedPlace) => savedPlace.id === place.id);

  const handleSavePlace = () => {
    addPlace(place);
  };

  const handleDeletePlace = () => {
    deletePlace(place.id);
  };

  const handleShowOnMap = () => {
    navigation.navigate("Mapa", { selectedPlace: place });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: place.image }} style={styles.image} resizeMode="contain"/>
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.description}>{place.description}</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isSaved ? "#FF6347" : "#4CAF50" }]}
        onPress={isSaved ? handleDeletePlace : handleSavePlace}
      >
        <Text style={styles.buttonText}>
          {isSaved ? "Usuń z zapisanych" : "Zapisz miejsce"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#2196F3" }]}
        onPress={handleShowOnMap}
      >
        <Text style={styles.buttonText}>Pokaż na mapie</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width > 600 ? 40 : 20,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
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
  button: {
    width: "60%",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
