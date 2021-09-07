import React from "react";
import { Text } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { RestaurantScreen } from "./src/features/restaurants/screens/restaurant.screen";
import { theme } from "./src/infrastructure/theme/index";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { SafeArea } from "./src/components/utility/safe-area.component";

const Tab = createBottomTabNavigator();

const Map = () => (
  <SafeArea>
    <Text>Map</Text>
  </SafeArea>
);

const Settings = () => (
  <SafeArea>
    <Text>Settings</Text>
  </SafeArea>
);

const TAB_ICON = {
  Restaurants: {
    Focused: "restaurant",
    Unfocused: "restaurant-outline",
  },
  Map: {
    Focused: "map",
    Unfocused: "map-outline",
  },
  Settings: {
    Focused: "settings",
    Unfocused: "settings-outline",
  },
};

const createScreenOptions = ({ route }) => {
  return {
    tabBarIcon: ({ focused, size, color }) => {
      let iconName;

      iconName = focused
        ? TAB_ICON[route.name].Focused
        : TAB_ICON[route.name].Unfocused;

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "tomato",
    tabBarInactiveColor: "grey",
    headerShown: false,
  };
};

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen name="Restaurants" component={RestaurantScreen} />
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
