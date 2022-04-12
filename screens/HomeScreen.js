import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import UserTab from "../components/UserTab";

const HomeScreen = (props) => {
  return (
    <View>
      <UserTab
        imageUri="https://reactnative.dev/img/tiny_logo.png"
        username="John Doe"
        navigation={props.navigation}
      />
      <TouchableOpacity onPress={() => props.navigation.navigate("New Match")}>
        <Text>New Match</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
