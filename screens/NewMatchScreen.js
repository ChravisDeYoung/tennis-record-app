import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Speech from "expo-speech";

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
          if (
            yourScore.reduce((parSum, a) => parSum + a, 0) >
            theirScore.reduce((parSum, a) => parSum + a, 0)
          )
            Speech.speak("Congrats on the win!");
          else Speech.speak("Better luck next time!");
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
      <Text style={styles.title}>New Match</Text>
      <ScrollView>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.inputLabel}>Against</Text>
          <TextInput
            placeholder="John Doe"
            style={styles.input}
            onChangeText={(e) => setOpponent(e)}
            value={opponent}
          />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.inputLabel}>Date</Text>
          <TextInput
            placeholder="April 20, 2021"
            style={styles.input}
            onChangeText={(e) => setDate(e)}
            value={date}
          />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.inputLabel}>Your Score</Text>
          <View style={styles.scoreContainer}>
            <TextInput
              style={styles.input}
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
              style={styles.input}
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
              style={styles.input}
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
          <Text style={styles.inputLabel}>Their Score</Text>
          <View style={styles.scoreContainer}>
            <TextInput
              style={styles.input}
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
              style={styles.input}
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
              style={styles.input}
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
            style={styles.button}
            onPress={saveDataWithFirebase}
          >
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 1000 }}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#1985ff",
  },
  button: {
    backgroundColor: "#1985ff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    textAlign: "center",
    alignSelf: "center",
    margin: 10,
    marginTop: 20,
    width: "40%",
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  inputLabel: {
    fontSize: 15,
    paddingBottom: 10,
    paddingTop: 20,
    color: "#1985ff",
  },
  input: {
    backgroundColor: "white",
    color: "#1985ff",
    padding: 10,
    marginHorizontal: 10,
    borderColor: "#1985ff",
    borderWidth: 1,
  },
  scoreContainer: { flexDirection: "row", justifyContent: "center" },
});

export default NewMatchScreen;
