import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import DetailsScreen from "./screens/DetailsScreen";
import OfflineScreen from "./screens/OfflineScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Details" component={DetailsScreen} />
        <Tab.Screen name="Offline" component={OfflineScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
