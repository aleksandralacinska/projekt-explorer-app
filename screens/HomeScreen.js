import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from "react-native";
import { placesData } from "../data/placesData";
import NetInfo from "@react-native-community/netinfo";

const { width, height } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Witaj w aplikacji Explorer!</Text>
        <Text style={styles.subHeader}>
          {isConnected ? "Kliknij miejsce, aby zobaczyć szczegóły:" : "Brak połączenia – lista miejsc niedostępna"}
        </Text>

        {isConnected ? (
          <FlatList
            data={placesData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.placeItem}
                onPress={() => navigation.navigate("Details", { place: item })}
              >
                <Image source={{ uri: item.image }} style={styles.thumbnail} />
                <Text style={styles.placeText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContainer}
            style={styles.list}
            showsVerticalScrollIndicator={false} // Ukrywa pasek przewijania
          />
        ) : (
          <Text style={styles.offlineText}>Przełącz się na tryb online, aby zobaczyć dostępne miejsca.</Text>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width > 600 ? 40 : 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: width > 600 ? 30 : 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subHeader: {
    fontSize: width > 600 ? 20 : 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  offlineText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  list: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 100, // Zapewnia odstęp na dole listy, aby ostatni element był widoczny
  },
  placeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: width > 600 ? 20 : 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  thumbnail: {
    width: width > 600 ? 70 : 50,
    height: width > 600 ? 70 : 50,
    borderRadius: 8,
    marginRight: 15,
  },
  placeText: {
    fontSize: width > 600 ? 22 : 18,
    fontWeight: "600",
    color: "#333",
  },
});
