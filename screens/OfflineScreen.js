import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { AppContext } from "../contexts/AppContext";

export default function OfflineScreen({ navigation }) {
  const { savedPlaces } = useContext(AppContext);

  const renderPlace = ({ item }) => (
    <TouchableOpacity
      style={styles.placeContainer}
      onPress={() => navigation.navigate("Details", { place: item })}
    >
      <Image source={item.image} style={styles.placeImage} />
      <Text style={styles.placeName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {savedPlaces.length > 0 ? (
        <FlatList
          data={savedPlaces}
          keyExtractor={(item) => item.id}
          renderItem={renderPlace}
        />
      ) : (
        <Text style={styles.emptyText}>Nie masz jeszcze zapisanych miejsc.</Text>
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
  placeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  placeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  placeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});