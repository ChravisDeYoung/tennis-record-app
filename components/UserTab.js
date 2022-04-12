import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const UserTab = (props) => {
  return (
    <TouchableOpacity
      style={styles.profileBtn}
      onPress={() => props.navigation.navigate("Profile")}
    >
      <Image source={{ uri: props.imageUri }} style={styles.image} />
      <View style={styles.nameContainer}>
        <Text style={styles.username}>{props.username}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  nameContainer: {
    justifyContent: "center",
    paddingLeft: 15,
  },
  profileBtn: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#C4C4C4",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default UserTab;
