import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { auth, firestore } from "../FirebaseConfig";

import UserTab from "../components/UserTab";
import MatchSummary from "../components/MatchSummary";

const HomeScreen = (props) => {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    retrieveDataFromFirebase();
  }, [props]);

  const retrieveDataFromFirebase = () => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .onSnapshot((doc) => {
        setUserName(doc.data().name);
        setUserImage(doc.data().image);
      });

    setMatches([]);
    firestore
      .collection(`users/${auth.currentUser.uid}/matches`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          setMatches((prev) => [
            ...prev,
            {
              opponent: doc.data().opponent,
              date: doc.data().date,
              yourScore: doc.data().yourScore,
              theirScore: doc.data().theirScore,
              status:
                doc.data().yourScore.reduce((parSum, a) => parSum + a, 0) >
                doc.data().theirScore.reduce((parSum, a) => parSum + a, 0)
                  ? "Win"
                  : "Loss",
            },
          ]);
        });
      });
  };

  return (
    <View>
      <UserTab
        imageUri={userImage === "" ? null : userImage}
        username={userName}
        navigation={props.navigation}
      />
      <Text style={styles.title}>Match History</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("New Match")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>New Match</Text>
      </TouchableOpacity>
      <ScrollView style={{ height: "70%", marginVertical: 10 }}>
        {matches.map((match, index) => (
          <MatchSummary match={match} key={index} user={userName} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1985ff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    textAlign: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
  },
});

export default HomeScreen;
