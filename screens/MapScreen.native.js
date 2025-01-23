import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const places = [
  {
    id: "1",
    name: "Pałac Kultury i Nauki",
    latitude: 52.23197596418862,
    longitude: 21.006037913028386,
  },
  {
    id: "2",
    name: "Muzeum Narodowe",
    latitude: 52.23220044580008,
    longitude: 21.024148400653765,
  },
  {
    id: "3",
    name: "Łazienki Królewskie",
    latitude: 52.21480474394637,
    longitude: 21.032969199534218,
  },
];

export default function MapScreen({ route }) {
  const { selectedPlace } = route.params || {};
  const [region, setRegion] = useState({
    latitude: 52.2297,
    longitude: 21.0122,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (selectedPlace) {
      setRegion({
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else {
      (async () => {
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
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      })();
    }
  }, [selectedPlace]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            title={place.name}
          />
        ))}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Twoja lokalizacja"
            pinColor="blue"
          />
        )}
        {selectedPlace && (
          <Marker
            coordinate={{
              latitude: selectedPlace.latitude,
              longitude: selectedPlace.longitude,
            }}
            title={selectedPlace.name}
            pinColor="green" // Zielony znacznik dla wybranego miejsca
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});