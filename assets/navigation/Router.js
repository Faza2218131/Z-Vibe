import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Homepage from "../screens/Homepage";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";
import Blogdetail from "../screens/Blogdetail";

import { Home, Heart, User } from "lucide-react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/* ================= TAB NAVIGATOR ================= */

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

/* ================= STACK NAVIGATOR ================= */

export default function Router() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={TabNavigator} />

      <Stack.Screen name="Blogdetail" component={Blogdetail} />
    </Stack.Navigator>
  );
}
