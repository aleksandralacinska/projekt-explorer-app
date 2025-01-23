import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { placesData } from "../data/placesData"; // Import miejsc

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Witaj w aplikacji Explorer!</Text>
      <Text style={styles.subHeader}>Kliknij miejsce, aby zobaczyć szczegóły:</Text>
      <FlatList
        data={placesData} // Użycie danych z pliku
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.placeItem}
            onPress={() => navigation.navigate("Details", { place: item })}
          >
            <Image source={item.image} style={styles.thumbnail} />
            <Text style={styles.placeText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  placeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  placeText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});