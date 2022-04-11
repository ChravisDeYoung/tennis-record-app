import React from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

const ProfileScreen = () => {
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: "grey",
          borderRadius: 75,
          height: 150,
          width: 150,
        }}
      >
        <Image />
      </TouchableOpacity>
      <TextInput
        placeholder="John Doe"
        style={{ backgroundColor: "lightblue" }}
      ></TextInput>
    </View>
  );
};

export default ProfileScreen;
