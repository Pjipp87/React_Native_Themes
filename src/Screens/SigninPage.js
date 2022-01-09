import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Headline, TextInput } from "react-native-paper";
import { auth } from "./FireBaseScreen";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { PreferencesContext } from "../utils/ThemeContext";

export const SigninPage = ({ setIsAuthenticated }) => {
  const { setCurrentUsernameFunc, currentUserName } =
    React.useContext(PreferencesContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const login = (email, password) => {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    signInWithEmailAndPassword(auth, `${email}`, `${password}`)
      .then((userCredential) => {
        const user = userCredential.user;
        //console.log("Eingeloggt", user.providerData[0].email);
        setIsAuthenticated();
      })
      .catch((error) => {
        alert(error);
        console.log("error: ", error);
      });
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: "center" }}>
      <Headline style={{ textAlign: "center" }}>Einloggen</Headline>
      <View style={{ paddingVertical: 30 }}>
        <TextInput
          style={{ marginVertical: 10 }}
          label="E-Mail"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={{ marginVertical: 10 }}
          label="Passwort"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={showPassword}
          right={
            <TextInput.Icon
              name="eye"
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            />
          }
        />
      </View>
      <Button onPress={() => login(email, password)}>Login</Button>
    </View>
  );
};

const styles = StyleSheet.create({});
