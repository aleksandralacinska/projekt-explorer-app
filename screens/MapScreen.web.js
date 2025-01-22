import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Pamiętaj, by w `web/index.html` dodać styl do Leaflet:
// <link
//   rel="stylesheet"
//   href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
// />

export default function MapScreen() {
  const [coords, setCoords] = useState({ lat: 52.2297, lng: 21.0122 });

  useEffect(() => {
    // (Opcjonalnie) expo-location także działa na web, ale przeglądarka
    // i tak poprosi o zezwolenie w inny sposób.
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          setCoords({ lat: latitude, lng: longitude });
        }

        // (Opcjonalnie) lokalne powiadomienie na web jest ograniczone
        // – expo-notifications wymaga dodatkowej konfiguracji (Web Push).
        // Tu tylko przykład:
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Twoja lokalizacja",
            body: `Lat: ${coords.lat.toFixed(2)}, Lng: ${coords.lng.toFixed(2)}`,
          },
          trigger: { seconds: 3 },
        });
      } catch (error) {
        console.log("Location error:", error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={[coords.lat, coords.lng]}>
          <Popup>Twoja lokalizacja</Popup>
        </Marker>
      </MapContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
