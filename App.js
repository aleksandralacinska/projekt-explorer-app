import React, { Suspense } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";

// Lazy loading widoków
const MapScreen = React.lazy(() => import("./screens/MapScreen"));
const DetailsScreen = React.lazy(() => import("./screens/DetailsScreen"));
const OfflineScreen = React.lazy(() => import("./screens/OfflineScreen"));

const Tab = createBottomTabNavigator();

// Komponent ładowania
function LoadingScreen() {
  return (
    <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <p>Ładowanie...</p>
    </div>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Suspense fallback={<LoadingScreen />}>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Details" component={DetailsScreen} />
          <Tab.Screen name="Offline" component={OfflineScreen} />
        </Tab.Navigator>
      </Suspense>
    </NavigationContainer>
  );
}
