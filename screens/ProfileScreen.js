import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { auth, firestore } from "../FirebaseConfig";

const ProfileScreen = () => {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => retrieveDataFromFirebase(), []);

  const saveDataWithFirebase = () => {
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
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });
  };

  const retrieveDataFromFirebase = () => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .onSnapshot((doc) => {
        setUserName(doc.data().name);
        setUserImage(doc.data().image);
        console.log("Document data:", doc.data());
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
      <TouchableOpacity
        style={{
          borderRadius: 75,
          height: 150,
          width: 150,
          backgroundColor: "#c4c4c4",
          alignSelf: "center",
          marginTop: 30,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={pickImage}
      >
        {userImage ? (
          <Image
            source={{ uri: userImage }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Text style={{ fontSize: 15, textAlign: "center" }}>
            Click to add image
          </Text>
        )}
      </TouchableOpacity>
      <TextInput
        placeholder="name"
        value={userName}
        style={{
          backgroundColor: "#c4c4c4",
          margin: 30,
          paddingVertical: 15,
          fontSize: 25,
          textAlign: "center",
          fontWeight: "bold",
        }}
        onChangeText={(e) => setUserName(e)}
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
        onPress={saveDataWithFirebase}
      >
        <Text style={{ fontSize: 15 }}>Update Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
