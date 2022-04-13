import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { auth } from "../FirebaseConfig";

const SignupScreen = (props) => {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerWithFirebase = () => {
    if (email !== "" && password !== "")
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          props.navigation.navigate("Home");
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const loginWithFirebase = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        props.navigation.navigate("Home");
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={{ height: "100%", overflow: "hidden" }}>
      <View
        style={{
          backgroundColor: "lightpink",
          width: "80vw",
          height: "80vw",
          borderRadius: "40vw",
          position: "absolute",
          left: "-10vw",
          top: "-10vw",
        }}
      >
        <View
          style={{
            backgroundColor: "lightgreen",
            width: "80vw",
            height: "80vw",
            borderRadius: "40vw",
            position: "relative",
            top: "60vw",
            left: "40vw",
          }}
        >
          <View
            style={{
              backgroundColor: "yellow",
              width: "100vw",
              height: "100vw",
              borderRadius: "50vw",
              position: "relative",
              top: "60vw",
              right: "80vw",
            }}
          ></View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "lightblue",
          width: "80vw",
          alignSelf: "center",
          padding: 15,
          marginTop: "20vh",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {showRegister ? "Sign up" : "Welcome back"}
        </Text>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="email"
          keyboardType="email-address"
          placeholder="email"
          style={{
            backgroundColor: "white",
            margin: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
          }}
        />
        <TextInput
          onChangeText={(value) => setPassword(value)}
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="password"
          keyboardType="visible-password"
          placeholder="password"
          style={{
            backgroundColor: "white",
            margin: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
          }}
        />
        <TouchableOpacity
          onPress={showRegister ? registerWithFirebase : loginWithFirebase}
          style={{
            backgroundColor: "#c4c4c4",
            padding: 10,
            textAlign: "center",
            width: "30vw",
            alignSelf: "center",
            margin: 10,
          }}
        >
          <Text style={{ fontSize: 15 }}>
            {showRegister ? "Register" : "Log in"}
          </Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: "center" }}>
          {showRegister ? "Already a member? " : "Not yet a member? "}
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={() => setShowRegister(!showRegister)}
          >
            {showRegister ? "Log in" : "Sign up"}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignupScreen;
