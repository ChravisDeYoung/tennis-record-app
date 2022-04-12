import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";

import UserTab from "../components/UserTab";
import MatchSummary from "../components/MatchSummary";

const HomeScreen = (props) => {
  const matches = [
    {
      date: "February 3",
      location: "Dorchester, ON",
      status: "Loss",
      opponent: {
        name: "Jane Doe",
        image: "https://reactnative.dev/img/tiny_logo.png",
      },
      home: [6, 5, 2],
      away: [3, 7, 6],
    },
    {
      date: "March 23",
      location: "London, ON",
      status: "Win",
      opponent: {
        name: "Saul Goodman",
        image: "https://reactnative.dev/img/tiny_logo.png",
      },
      home: [6, 4, 6],
      away: [4, 6, 2],
    },
    {
      date: "February 3",
      location: "Dorchester, ON",
      status: "Loss",
      opponent: {
        name: "Jane Doe",
        image: "https://reactnative.dev/img/tiny_logo.png",
      },
      home: [6, 5, 2],
      away: [3, 7, 6],
    },
    {
      date: "March 23",
      location: "London, ON",
      status: "Win",
      opponent: {
        name: "Saul Goodman",
        image: "https://reactnative.dev/img/tiny_logo.png",
      },
      home: [6, 4, 6],
      away: [4, 6, 2],
    },
  ];

  return (
    <View>
      <UserTab
        imageUri="https://reactnative.dev/img/tiny_logo.png"
        username="John Doe"
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
          <MatchSummary match={match} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
