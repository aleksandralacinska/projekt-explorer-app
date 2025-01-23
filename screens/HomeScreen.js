import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";

const places = [
  {
    id: "1",
    name: "Muzeum Narodowe",
    description: "Słynne muzeum w Warszawie.",
    image: require("../assets/muzeum.png"),
  },
  {
    id: "2",
    name: "Łazienki Królewskie",
    description: "Park i pałace w Warszawie.",
    image: require("../assets/lazienki.png"),
  },
  {
    id: "3",
    name: "Pałac Kultury i Nauki",
    description: "Ikoniczny budynek w centrum Warszawy.",
    image: require("../assets/palac.png"),
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Witaj w aplikacji Explorer!</Text>
      <Text style={styles.subHeader}>Kliknij miejsce, aby zobaczyć szczegóły:</Text>
      <FlatList
        data={places}
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
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