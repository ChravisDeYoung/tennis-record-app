import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { auth, firestore } from "../FirebaseConfig";

import UserTab from "../components/UserTab";

const NewMatchScreen = (props) => {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [opponent, setOpponent] = useState("");
  const [date, setDate] = useState("");
  const [yourScore, setYourScore] = useState([0, 0, 0]);
  const [theirScore, setTheirScore] = useState([0, 0, 0]);

  useEffect(() => retrieveDataFromFirebase(), []);

  const retrieveDataFromFirebase = () => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .onSnapshot((doc) => {
        setUserName(doc.data().name);
        setUserImage(doc.data().image);
      });
  };

  const saveDataWithFirebase = () => {
    if (userName === "" || userImage === "")
      Alert.alert("Missing image or name. Please try again.");
    else {
      firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("matches")
        .add({
          opponent: opponent,
          date: date,
          yourScore: yourScore,
          theirScore: theirScore,
        })
        .then(() => {
          console.log("Document successfully written!");
          setOpponent("");
          setDate("");
          setYourScore([0, 0, 0]);
          setTheirScore([0, 0, 0]);
          Alert.alert("Match Added!");
          props.navigation.navigate("Home");
        })
        .catch((error) => {
          console.log("Error writing document: ", error);
        });
    }
  };

  return (
    <KeyboardAvoidingView>
      <UserTab
        imageUri={userImage === "" ? null : userImage}
        username={userName}
        navigation={props.navigation}
      />
      <Text style={{ fontSize: 20, textAlign: "center", marginTop: 20 }}>
        New Match
      </Text>
      <ScrollView>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 15, paddingBottom: 10, paddingTop: 20 }}>
            Against
          </Text>
          <TextInput
            placeholder="John Doe"
            style={{ backgroundColor: "#c4c4c4", fontSize: 15, padding: 10 }}
            onChangeText={(e) => setOpponent(e)}
            value={opponent}
          />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 15, paddingBottom: 10, paddingTop: 20 }}>
            Date
          </Text>
          <TextInput
            placeholder="April 20, 2021"
            style={{ backgroundColor: "#c4c4c4", fontSize: 15, padding: 10 }}
            onChangeText={(e) => setDate(e)}
            value={date}
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
              onChangeText={(e) =>
                setYourScore((prev) => {
                  prev[0] = Number(e);
                  return [...prev];
                })
              }
              keyboardType="numeric"
            />
            <TextInput
              style={{
                backgroundColor: "#c4c4c4",
                padding: 10,
                marginHorizontal: 10,
              }}
              placeholder="0"
              onChangeText={(e) =>
                setYourScore((prev) => {
                  prev[1] = Number(e);
                  return [...prev];
                })
              }
              keyboardType="numeric"
            />
            <TextInput
              style={{
                backgroundColor: "#c4c4c4",
                padding: 10,
                marginHorizontal: 10,
              }}
              placeholder="0"
              onChangeText={(e) =>
                setYourScore((prev) => {
                  prev[2] = Number(e);
                  return [...prev];
                })
              }
              keyboardType="numeric"
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
              onChangeText={(e) =>
                setTheirScore((prev) => {
                  prev[0] = Number(e);
                  return [...prev];
                })
              }
              keyboardType="numeric"
            />
            <TextInput
              style={{
                backgroundColor: "#c4c4c4",
                padding: 10,
                marginHorizontal: 10,
              }}
              placeholder="0"
              onChangeText={(e) =>
                setTheirScore((prev) => {
                  prev[1] = Number(e);
                  return [...prev];
                })
              }
              keyboardType="numeric"
            />
            <TextInput
              style={{
                backgroundColor: "#c4c4c4",
                padding: 10,
                marginHorizontal: 10,
              }}
              placeholder="0"
              onChangeText={(e) =>
                setTheirScore((prev) => {
                  prev[2] = Number(e);
                  return [...prev];
                })
              }
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#c4c4c4",
              alignSelf: "center",
              paddingVertical: 10,
              paddingHorizontal: 20,
              margin: 15,
            }}
            onPress={saveDataWithFirebase}
          >
            <Text style={{ fontSize: 15 }}>Finish</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#c4c4c4",
              alignSelf: "center",
              paddingVertical: 10,
              paddingHorizontal: 20,
              margin: 15,
            }}
            onPress={() => props.navigation.goBack()}
          >
            <Text style={{ fontSize: 15 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 1000 }}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewMatchScreen;
