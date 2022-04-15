import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";

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
      <Text style={{ fontSize: 20, textAlign: "center", padding: 10 }}>
        Match History
      </Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("New Match")}
        style={{
          backgroundColor: "#c4c4c4",
          width: 100,
          alignSelf: "center",
          padding: 5,
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 15, textAlign: "center" }}>New Match</Text>
      </TouchableOpacity>
      <ScrollView style={{ height: "65%" }}>
        {matches.map((match, index) => (
          <MatchSummary match={match} key={index} user={userName} />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
