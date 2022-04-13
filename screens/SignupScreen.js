import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { auth } from "../FirebaseConfig";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerWithFirebase = () => {
    if (email !== "" && password !== "")
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(function (_firebaseUser) {
          console.log("user registered!");

          setEmail("");
          setPassword("");
          console.log(_firebaseUser);
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode == "auth/weak-password") {
            console.log("The password is too weak.");
          } else {
            console.log(errorMessage);
          }
          console.log(error);
        });
  };

  return (
    <View>
      <Text>Register with Firebase</Text>
      <TextInput
        onChangeText={(value) => setEmail(value)}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="email"
        keyboardType="email-address"
        placeholder="email"
      />
      <TextInput
        onChangeText={(value) => setPassword(value)}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="password"
        keyboardType="visible-password"
        placeholder="password"
      />
      <TouchableOpacity onPress={registerWithFirebase}>
        <Text>Sign up</Text>
      </TouchableOpacity>
      {/* <Button title="Register" onPress={registerWithFirebase} /> */}
    </View>
  );
};

export default SignupScreen;
