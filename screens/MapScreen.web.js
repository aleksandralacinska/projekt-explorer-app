import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as Location from "expo-location";
import { placesData } from "../data/placesData";

const { width, height } = Dimensions.get("window");

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapScreen({ route }) {
  const [coords, setCoords] = useState({ lat: 52.2297, lng: 21.0122 });
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          setCoords({ lat: latitude, lng: longitude });
          setUserLocation({ lat: latitude, lng: longitude });
        }
      } catch (error) {
        console.log("❌ Błąd pobierania lokalizacji:", error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={13}
        style={{ height: height > 700 ? height : 400, width: "100%" }}
      >
        {/* Warstwa mapy OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
          noWrap={true}
          detectRetina={true}
        />

        {/* Markery miejsc */}
        {placesData.map((place) => (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            icon={customIcon}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))}

        {/* Lokalizacja użytkownika */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={customIcon}>
            <Popup>Twoja lokalizacja</Popup>
          </Marker>
        )}
      </MapContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
