import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as Location from "expo-location";
import { placesData } from "../data/placesData"; // Import miejsc

export default function MapScreen() {
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
        {placesData.map((place) => (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={
              new L.Icon({
                iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x-blue.png",
                shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          >
            <Popup>Twoja lokalizacja</Popup>
          </Marker>
        )}
      </MapContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});