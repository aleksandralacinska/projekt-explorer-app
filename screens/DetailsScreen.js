import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { AppContext } from "../contexts/AppContext";

export default function DetailsScreen({ route }) {
  const { place } = route.params; // Odbieranie danych miejsca
  const { savedPlaces, savePlace, removePlace } = useContext(AppContext);

  const isSaved = savedPlaces.some((savedPlace) => savedPlace.id === place.id);

  return (
    <View style={styles.container}>
      <Image source={place.image} style={styles.image} />
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.description}>{place.description}</Text>
      {isSaved ? (
        <Button
          title="Usuń z zapisanych"
          onPress={() => removePlace(place)}
          color="#FF6347" // Kolor czerwony
        />
      ) : (
        <Button
          title="Zapisz miejsce"
          onPress={() => savePlace(place)}
          color="#4CAF50" // Kolor zielony
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
});