import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { auth, firestore } from "../FirebaseConfig";

import UserTab from "../components/UserTab";

const NewMatchScreen = (props) => {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => retrieveDataFromFirebase(), []);

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

  return (
    <View>
      <UserTab
        imageUri={userImage}
        username={userName}
        navigation={props.navigation}
      />
      <Text style={{ fontSize: 20, textAlign: "center", marginTop: 20 }}>
        New Match
      </Text>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 15, paddingBottom: 10, paddingTop: 20 }}>
          Against
        </Text>
        <TextInput
          placeholder="John Doe"
          style={{ backgroundColor: "#c4c4c4", fontSize: 15, padding: 10 }}
        />
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 15, paddingBottom: 10, paddingTop: 20 }}>
          Date
        </Text>
        <TextInput
          placeholder="April 20, 2021"
          style={{ backgroundColor: "#c4c4c4", fontSize: 15, padding: 10 }}
        />
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 15, paddingBottom: 10, paddingTop: 20 }}>
          Your Score
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TextInput
            style={{
              backgroundColor: "#c4c4c4",
              padding: 10,
              marginHorizontal: 10,
            }}
            placeholder="0"
          />
          <TextInput
            style={{
              backgroundColor: "#c4c4c4",
              padding: 10,
              marginHorizontal: 10,
            }}
            placeholder="0"
          />
          <TextInput
            style={{
              backgroundColor: "#c4c4c4",
              padding: 10,
              marginHorizontal: 10,
            }}
            placeholder="0"
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 15, paddingBottom: 10, paddingTop: 20 }}>
          Their Score
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TextInput
            style={{
              backgroundColor: "#c4c4c4",
              padding: 10,
              marginHorizontal: 10,
            }}
            placeholder="0"
          />
          <TextInput
            style={{
              backgroundColor: "#c4c4c4",
              padding: 10,
              marginHorizontal: 10,
            }}
            placeholder="0"
          />
          <TextInput
            style={{
              backgroundColor: "#c4c4c4",
              padding: 10,
              marginHorizontal: 10,
            }}
            placeholder="0"
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#c4c4c4",
          alignSelf: "center",
          paddingVertical: 10,
          paddingHorizontal: 20,
          margin: 15,
        }}
      >
        <Text style={{ fontSize: 15 }}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewMatchScreen;
