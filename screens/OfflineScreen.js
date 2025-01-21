import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OfflineScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>To jest ekran Offline!</Text>
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
  },
});
