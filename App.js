import React, { useEffect, useState } from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import MapScreen from "./screens/MapScreen";
import OfflineScreen from "./screens/OfflineScreen";
import { AppProvider } from "./contexts/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import NetInfo from "@react-native-community/netinfo";
import { LogBox, Platform } from "react-native";

LogBox.ignoreLogs(["props.pointerEvents is deprecated"]);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Konfiguracja powiadomień
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Strona główna") {
            iconName = "home-outline";
          } else if (route.name === "Mapa") {
            iconName = "map-outline";
          } else if (route.name === "Zapisane") {
            iconName = "bookmark-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#ccc",
        },
      })}
    >
      <Tab.Screen name="Strona główna" component={HomeScreen} />
      <Tab.Screen name="Mapa" component={MapScreen} />
      <Tab.Screen name="Zapisane" component={OfflineScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Powrót"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: "Szczegóły miejsca" }}
      />
      <Stack.Screen
        name="Mapa"
        component={MapScreen}
        options={{ title: "Mapa miejsca" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Alert.alert(
          "Brak połączenia",
          "Jesteś offline. Niektóre funkcje mogą być niedostępne."
        );
      }
    });

    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Brak dostępu do powiadomień!");
      }
    };
    requestPermissions();

    return () => unsubscribe();
  }, []);

  return (
    <AppProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <NavigationContainer>
            {!isConnected && (
              <View style={styles.offlineBanner}>
                <Text style={styles.offlineText}>Tryb offline</Text>
              </View>
            )}
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  offlineBanner: {
    backgroundColor: "#FF6347",
    padding: 10,
    alignItems: "center",
  },
  offlineText: {
    color: "white",
    fontWeight: "bold",
  },
});
