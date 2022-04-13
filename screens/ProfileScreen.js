import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const ProfileScreen = () => {
  return (
    <View>
      <TouchableOpacity
        style={{
          borderRadius: 75,
          height: 150,
          width: 150,
          backgroundColor: "#c4c4c4",
          alignSelf: "center",
          marginTop: 30,
        }}
      >
        <Image />
      </TouchableOpacity>
      <TextInput
        placeholder="name"
        style={{
          backgroundColor: "#c4c4c4",
          margin: 30,
          paddingVertical: 15,
          fontSize: 25,
          textAlign: "center",
          fontWeight: "bold",
        }}
      ></TextInput>
      <View style={{ paddingHorizontal: 30, paddingBottom: 10 }}>
        <Text style={{ fontSize: 20, alignSelf: "center" }}>Stats</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 20,
          }}
        >
          <Text style={{ fontSize: 15 }}>Total Games Played:</Text>
          <Text style={{ fontSize: 15 }}>20</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 15 }}>Total Games Won:</Text>
          <Text style={{ fontSize: 15 }}>16</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 20,
          }}
        >
          <Text style={{ fontSize: 15 }}>Total Games Lost:</Text>
          <Text style={{ fontSize: 15 }}>4</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: "#c4c4c4", alignSelf: "center", padding: 15 }}
      >
        <Text style={{ fontSize: 15 }}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
