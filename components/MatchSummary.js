import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MatchSummary = ({ match, user }) => {
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
