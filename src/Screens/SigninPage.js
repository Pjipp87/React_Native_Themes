import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";

export const SigninPage = ({ login }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Nicht eingeloggt</Text>
      <Button onPress={login}>Login</Button>
    </View>
  );
};

const styles = StyleSheet.create({});
