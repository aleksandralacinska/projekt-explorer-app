import React, { useEffect, useState } from "react";
import { Platform, View, StyleSheet, Text, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps"; // dla mobilnych
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";

// Konfiguracja powiadomień
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function MapScreen() {
  const [region, setRegion] = useState({
    latitude: 52.2297,
    longitude: 21.0122,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    // Funkcja obsługująca lokalizację
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Brak dostępu do lokalizacji!");
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });

        // Wyślij powiadomienie o lokalizacji
        sendNotification(location.coords.latitude, location.coords.longitude);
      }
    })();
  }, []);

  // Funkcja wysyłająca powiadomienie o lokalizacji
  const sendNotification = async (latitude, longitude) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Twoja lokalizacja została zaktualizowana!",
        body: `Obecnie jesteś w pobliżu: ${latitude.toFixed(
          2
        )}, ${longitude.toFixed(2)}`,
      },
      trigger: { seconds: 2 }, // Powiadomienie pojawi się po 2 sekundach
    });
  };

  if (Platform.OS === "web") {
    const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
    return (
      <View style={styles.container}>
        <MapContainer
          center={[region.latitude, region.longitude]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[region.latitude, region.longitude]}>
            <Popup>Twoja lokalizacja</Popup>
          </Marker>
        </MapContainer>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
          title="Twoja lokalizacja"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
