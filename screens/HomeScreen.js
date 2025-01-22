import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as Notifications from "expo-notifications";

const sendNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Nowe wydarzenie!",
      body: "Sprawdź, co dzieje się w Twojej okolicy.",
    },
    trigger: { seconds: 5 },
  });
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Witaj w aplikacji Explorer!</Text>
      <Text style={styles.text}>Tutaj znajdziesz rekomendacje miejsc w pobliżu.</Text>
      <Button title="Wyślij powiadomienie" onPress={sendNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
});
