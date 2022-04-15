import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import { auth } from "../FirebaseConfig";

const UserTab = (props) => {
  const signoutWithFirebase = () => {
    auth.signOut().then(() => {
      props.navigation.navigate("Auth");
    });
  };

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Yes", onPress: signoutWithFirebase },
      { text: "Cancel", onPress: () => console.log("cancel") },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileBtn}
        onPress={() => props.navigation.navigate("Profile")}
      >
        <Image source={{ uri: props.imageUri }} style={styles.image} />
        <View style={styles.nameContainer}>
          <Text style={styles.username}>{props.username}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Entypo name="log-out" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    paddingTop: 22,
    backgroundColor: "#1985ff",
    justifyContent: "space-between",
  },
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
  },
  logoutBtn: {
    justifyContent: "center",
    paddingLeft: 15,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default UserTab;
