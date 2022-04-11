import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const HomeScreen = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.navigate("Profile")}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
