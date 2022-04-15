import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { auth, firestore } from "../FirebaseConfig";

const ProfileScreen = (props) => {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  useEffect(() => retrieveDataFromFirebase(), []);

  const saveDataWithFirebase = () => {
    if (userName === "" || userImage === "")
      Alert.alert("Missing image or name. Please try again.");
    else {
      firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .set(
          {
            name: userName,
            image: userImage,
          },
          {
            merge: true,
          }
        )
        .then(() => {
          console.log("Document successfully written!");
          Alert.alert("Profile updated!");
          props.navigation.navigate("Home");
        })
        .catch((error) => {
          console.log("Error writing document: ", error);
        });
    }
  };

  const retrieveDataFromFirebase = () => {
    setWins(0);
    setLosses(0);
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .onSnapshot((doc) => {
        if (doc.data()) {
          setUserName(doc.data().name);
          setUserImage(doc.data().image);
        }
      });

    firestore
      .collection(`users/${auth.currentUser.uid}/matches`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (
            doc.data().yourScore.reduce((parSum, a) => parSum + a, 0) >
            doc.data().theirScore.reduce((parSum, a) => parSum + a, 0)
          )
            setWins((prev) => prev + 1);
          else setLosses((prev) => prev + 1);
        });
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserImage(result.uri);
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {userImage ? (
          <Image
            source={{ uri: userImage }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Text style={{ fontSize: 15, textAlign: "center", color: "white" }}>
            Click to add image
          </Text>
        )}
      </TouchableOpacity>
      <TextInput
        placeholder="name"
        value={userName}
        style={styles.nameInput}
        onChangeText={(e) => setUserName(e)}
      ></TextInput>
      <View style={styles.statsContainer}>
        <Text style={styles.title}>Stats</Text>
        <View style={styles.statsRow}>
          <Text style={{ fontSize: 15 }}>Total Games Played:</Text>
          <Text style={{ fontSize: 15 }}>{losses}</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={{ fontSize: 15 }}>Total Games Won:</Text>
          <Text style={{ fontSize: 15 }}>{wins}</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={{ fontSize: 15 }}>Total Games Lost:</Text>
          <Text style={{ fontSize: 15 }}>{wins + losses}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={saveDataWithFirebase}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 75,
    height: 150,
    width: 150,
    backgroundColor: "#1985ff",
    alignSelf: "center",
    marginTop: 30,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  nameInput: {
    backgroundColor: "white",
    margin: 30,
    paddingVertical: 15,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1985ff",
    borderColor: "#1985ff",
    borderWidth: 1,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  statsContainer: { paddingHorizontal: 30, paddingBottom: 20 },
  title: { fontSize: 20, alignSelf: "center", fontWeight: "bold" },
  buttonContainer: { flexDirection: "column", justifyContent: "center" },
  button: {
    backgroundColor: "#1985ff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    textAlign: "center",
    alignSelf: "center",
    margin: 10,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
