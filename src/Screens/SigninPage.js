import React, { useState, useContext, useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Headline, TextInput } from "react-native-paper";
//import { auth } from "./FireBaseScreen";
import { signInWithEmailAndPassword } from "firebase/auth";
import { PreferencesContext } from "../utils/ThemeContext";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

export const SigninPage = ({ setIsAuthenticated, auth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      "136968103658-22hv9fa91qtfte1pvq38fknoq7q996em.apps.googleusercontent.com",
    iosClientId:
      "136968103658-22hv9fa91qtfte1pvq38fknoq7q996em.apps.googleusercontent.com",
    androidClientId:
      "136968103658-22hv9fa91qtfte1pvq38fknoq7q996em.apps.googleusercontent.com",
    webClientId:
      "136968103658-22hv9fa91qtfte1pvq38fknoq7q996em.apps.googleusercontent.com",
  });

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

  //########################################################### Google über Expo

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (response?.type === "success") {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);

        signInWithCredential(auth, credential)
          .then((userCredential) => {
            const user = userCredential.user;
            setIsAuthenticated();
          })
          .catch((error) => {
            alert(error);
            console.log("error: ", error);
          });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [response]);

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
      <Button
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        Login2
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});
