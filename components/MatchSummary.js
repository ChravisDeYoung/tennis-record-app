import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as MailComposer from "expo-mail-composer";

const MatchSummary = ({ match, user }) => {
  const sendMessageWithEmail = async () => {
    const isAvailable = await MailComposer.isAvailableAsync();

    if (isAvailable) {
      var options = {
        subject: `Tennis Match ${match.status}`,
        body: `Great match with ${match.opponent}! I ${
          match.status === "Win" ? "won" : "lost"
        } with a score of ${match.yourScore} to ${match.theirScore}.`,
      };

      MailComposer.composeAsync(options).then((result) => {
        console.log(result.status);
      });
    } else {
      console.log("Email is not available on this device");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 12 }}>{match.date}</Text>
      <Text style={styles.title}>{match.status}</Text>
      <View style={styles.scoreRow}>
        <Text
          style={{ fontWeight: match.status === "Win" ? "bold" : "normal" }}
        >
          {user}
        </Text>
        <View style={styles.spacedRow}>
          {match.yourScore.map((score, index) => (
            <Text key={index} style={styles.score}>
              {score}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.scoreRow}>
        <View style={styles.opponentName}>
          <Text
            style={{ fontWeight: match.status === "Loss" ? "bold" : "normal" }}
          >
            {match.opponent}
          </Text>
        </View>
        <View style={styles.spacedRow}>
          {match.theirScore.map((score, index) => (
            <Text key={index} style={styles.score}>
              {score}
            </Text>
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          alignSelf: "center",
          padding: 15,
          marginHorizontal: 10,
        }}
        onPress={() =>
          Alert.alert("Share", "How would you like to share?", [
            { text: "Email", onPress: sendMessageWithEmail },
            { text: "Cancel" },
          ])
        }
      >
        <Text style={{ fontSize: 15 }}>Share Match</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c4c4c4",
    width: "80%",
    alignSelf: "center",
    padding: 10,
    margin: 15,
  },
  spacedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  opponentName: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreRow: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    alignSelf: "center",
    paddingVertical: 5,
    fontWeight: "bold",
    fontSize: 17,
  },
  score: {
    backgroundColor: "white",
    marginHorizontal: 5,
    height: 20,
    width: 20,
    textAlign: "center",
  },
  opponentImage: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
});

export default MatchSummary;
