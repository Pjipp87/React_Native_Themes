import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";
import { Button } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";
import * as ImagePicker from "expo-image-picker";

export const MessageScreen = () => {
  const { toggleMessage } = React.useContext(PreferencesContext);

  return (
    <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
      <Text>MessageScreen</Text>
      <Button mode="contained" compact={true} onPress={() => toggleMessage()}>
        Löschen
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});
