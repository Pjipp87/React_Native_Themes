import React from "react";
import { Pressable, View, Modal } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import styled from "styled-components";
import { PreferencesContext } from "../utils/ThemeContext";
import { useTheme } from "react-native-paper";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { useEffect } from "react";

const ModalView = styled(View)`
  flex: 1;
  background-color: green;
`;
const LoginView = styled(View)`
  flex: 0.7;
  justify-content: center;
  padding: 20px;
  background-color: blue;
`;

const Spacer = styled(View)`
  padding: 10px;
`;

export const LoginModal = () => {
  const { colors } = useTheme();
  const { toggleLogin } = React.useContext(PreferencesContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setisLoading] = useState(false);

  const checkLogin = () => {
    if (
      username.toLowerCase() === "admin" &&
      password.toLowerCase() === "admin"
    ) {
      setisLoading(true);
      setTimeout(() => {
        toggleLogin();
      }, 2000);
    } else {
      alert("Zugangsdaten nicht Korrekt!");
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" animating={true} color="blue" />
      </View>
    );
  }
  return (
    <Modal animationType="fade">
      <ModalView style={{ backgroundColor: colors.background }}>
        <LoginView style={{ backgroundColor: colors.background }}>
          <TextInput
            mode="outlined"
            placeholder="Benutzername"
            label="Benutzername"
            onChangeText={(text) => setUsername(text)}
          />
          <Spacer />
          <TextInput
            placeholder="Passwort"
            mode="outlined"
            label="Password"
            onChangeText={(text) => setPassword(text)}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 20,
            }}
          >
            <Button onPress={() => alert("Pech gehabt ;)")}>
              Passwort vergessen
            </Button>
            <Button icon="location-enter" mode="contained" onPress={checkLogin}>
              Login
            </Button>
          </View>
        </LoginView>
      </ModalView>
    </Modal>
  );
};
