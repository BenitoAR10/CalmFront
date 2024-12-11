import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CalmaAhoraScreen from "../screens/CalmaAhoraScreen";
import ReproductorScreen from "../screens/ReproductorScreen";
import ListaEjerciciosScreen from "../screens/ListaEjerciciosScreen";
import KitDeAyudaScreen from "../screens/KitDeAyudaScreen";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../utils/colors";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PlaceholderScreen = ({ name }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>{name} Screen</Text>
  </View>
);

function CalmaAhoraStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CalmaAhora" component={CalmaAhoraScreen} />
      <Stack.Screen name="Reproductor" component={ReproductorScreen} />
      <Stack.Screen name="ListaEjercicios" component={ListaEjerciciosScreen} />
      <Stack.Screen name="KitDeAyuda" component={KitDeAyudaScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Calma Ahora") {
              iconName = focused ? "leaf" : "leaf-outline";
            } else if (route.name === "Calendario") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "Citas") {
              iconName = focused ? "clipboard" : "clipboard-outline";
            } else if (route.name === "Mi Perfil") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.inactive,
          tabBarStyle: {
            backgroundColor: colors.background,
            height: 60,
            borderTopColor: "transparent",
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Calendario" component={PlaceholderScreen} />
        <Tab.Screen name="Calma Ahora" component={CalmaAhoraStack} />
        <Tab.Screen name="Citas" component={PlaceholderScreen} />
        <Tab.Screen name="Mi Perfil" component={PlaceholderScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
