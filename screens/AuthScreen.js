import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { auth } from "../FirebaseConfig";

const AuthScreen = (props) => {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const registerWithFirebase = () => {
    setErrorText("");
    if (email !== "" && password !== "")
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          props.navigation.navigate("Profile");
        })
        .catch((error) => {
          if (error.code === "auth/weak-password")
            setErrorText("weak password");
          console.log(error);
        });
  };

  const loginWithFirebase = () => {
    setErrorText("");
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        props.navigation.navigate("Home", { userId: auth.currentUser.uid });
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password")
          setErrorText("incorrect password");
        else if (error.code === "auth/user-not-found")
          setErrorText("user not found");
        console.log(error);
      });
  };

  return (
    <View style={{ height: "100%", overflow: "hidden" }}>
      <View
        style={{
          backgroundColor: "lightpink",
          width: 200,
          height: 200,
          borderRadius: 100,
          position: "absolute",
          left: -10,
          top: -10,
        }}
      >
        <View
          style={{
            backgroundColor: "lightgreen",
            width: 300,
            height: 300,
            borderRadius: 150,
            position: "relative",
            top: 150,
            left: 100,
          }}
        >
          <View
            style={{
              backgroundColor: "yellow",
              width: 150,
              height: 150,
              borderRadius: 75,
              position: "relative",
              top: 250,
              right: 100,
            }}
          ></View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "lightblue",
          width: "80%",
          alignSelf: "center",
          padding: 15,
          marginTop: "30%",
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
            borderColor: errorText !== "" ? "red" : "white",
            borderWidth: errorText !== "" ? 1 : 0,
          }}
        />
        <TextInput
          onChangeText={(value) => setPassword(value)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          autoCompleteType="password"
          keyboardType="visible-password"
          placeholder="password"
          style={{
            backgroundColor: "white",
            margin: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            borderColor: errorText !== "" ? "red" : "white",
            borderWidth: errorText !== "" ? 1 : 0,
          }}
        />
        {errorText !== "" && (
          <Text style={{ color: "red", textAlign: "center" }}>{errorText}</Text>
        )}
        <TouchableOpacity
          onPress={showRegister ? registerWithFirebase : loginWithFirebase}
          style={{
            backgroundColor: "#c4c4c4",
            padding: 10,
            textAlign: "center",
            width: "30%",
            alignSelf: "center",
            margin: 10,
          }}
        >
          <Text style={{ fontSize: 15, textAlign: "center" }}>
            {showRegister ? "Register" : "Log in"}
          </Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: "center" }}>
          {showRegister ? "Already a member? " : "Not yet a member? "}
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={() => {
              setShowRegister(!showRegister);
              setErrorText("");
            }}
          >
            {showRegister ? "Log in" : "Sign up"}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default AuthScreen;
