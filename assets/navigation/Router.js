import React, { useEffect, useState } from "react";

import { View, ActivityIndicator } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { supabase } from "../libs/supabase";

import Homepage from "../screens/Homepage";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";
import Blogdetail from "../screens/Blogdetail";
import UploadBlog from "../screens/UploadBlog";
import EditBlog from "../screens/EditBlog";
import Login from "../screens/Login";
import Register from "../screens/Register";

import {
  Home,
  Heart,
  User,
} from "lucide-react-native";

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
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Heart color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/* ================= ROUTER ================= */

export default function Router() {
  const [session, setSession] =
    useState(undefined);

  useEffect(() => {
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () =>
      subscription.unsubscribe();
  }, []);

  const checkSession = async () => {
    const { data } =
      await supabase.auth.getSession();

    setSession(data.session);
  };

  if (session === undefined) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {session ? (
        <>
          <Stack.Screen
            name="Main"
            component={TabNavigator}
          />

          <Stack.Screen
            name="BlogDetail"
            component={Blogdetail}
            options={{
              gestureEnabled: true,
              gestureDirection:
                "horizontal",
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          <Stack.Screen
            name="UploadBlog"
            component={UploadBlog}
          />

          <Stack.Screen
            name="EditBlog"
            component={EditBlog}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
          />

          <Stack.Screen
            name="Register"
            component={Register}
          />
        </>
      )}
    </Stack.Navigator>
  );
}