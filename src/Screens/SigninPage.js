import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, View, Vibration } from "react-native";
import { Text, Button, Headline } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

export const SigninPage = ({ setIsAuthenticated, auth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      // Funktionierender KEY
      "386412330846-8j406sab665o9sbv2iap824fnphri4qt.apps.googleusercontent.com",
    iosClientId:
      "136968103658-5n8298t5tgmg7gdi5ae0h1pf3mh837a6.apps.googleusercontent.com",
    androidClientId:
      "386412330846-ho4lhtlke1ud78bflmvh7eamtms083nc.apps.googleusercontent.com",
    //  "136968103658-22hv9fa91qtfte1pvq38fknoq7q996em.apps.googleusercontent.com",
    webClientId:
      "129743817987-7vicedqtosjs1sheistcrq4eqf0a6gob.apps.googleusercontent.com",
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

  const _login = () => {
    Vibration.vibrate(50);
    promptAsync();
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 150,
        justifyContent: "space-around",
      }}
    >
      <Headline
        style={{
          textAlign: "center",
          marginBottom: 15,
          fontWeight: "bold",
          letterSpacing: 10,
        }}
      >
        Einloggen
      </Headline>

      <Button
        mode="contained"
        icon="google"
        disabled={!request}
        color="blue"
        style={{ marginHorizontal: 65, elevation: 15 }}
        contentStyle={{ paddingVertical: 5 }}
        onPress={() => {
          _login();
        }}
      >
        Mit Google Account
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});

/**      <View style={{ paddingVertical: 30 }}>
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
      <Button onPress={() => login(email, password)}>Login</Button> */
