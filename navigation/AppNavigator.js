import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NewMatchScreen from "../screens/NewMatchScreen";
import SignupScreen from "../screens/SignupScreen";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign up">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Match History",
            headerStyle: {
              backgroundColor: "#43b599",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Edit Profile",
            headerStyle: {
              backgroundColor: "#43b599",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="New Match"
          component={NewMatchScreen}
          options={{
            title: "New Match",
            headerStyle: {
              backgroundColor: "#43b599",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Sign up"
          component={SignupScreen}
          options={{
            title: "Sign up",
            headerStyle: {
              backgroundColor: "#43b599",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
