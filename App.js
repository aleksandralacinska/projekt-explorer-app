import React, { Suspense } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AppProvider } from "./contexts/AppContext";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
      })}
    >
      <Tab.Screen name="Strona główna" component={HomeScreen} />
      <Tab.Screen name="Mapa" component={React.lazy(() => import("./screens/MapScreen"))} />
      <Tab.Screen name="Zapisane" component={React.lazy(() => import("./screens/OfflineScreen"))} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Suspense fallback={<p>Ładowanie...</p>}>
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
            component={React.lazy(() => import("./screens/MapScreen"))}
            options={{ title: "Mapa miejsca" }}
          />
        </Stack.Navigator>
        </Suspense>
      </NavigationContainer>
    </AppProvider>
  );
}