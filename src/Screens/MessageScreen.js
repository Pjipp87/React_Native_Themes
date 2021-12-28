import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Button } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";

export const MessageScreen = () => {
  const { toggleMessage } = React.useContext(PreferencesContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>MessageScreen</Text>
      <Button
        mode="contained"
        compact={true}
        icon="home"
        onPress={() => toggleMessage()}
      >
        Löschen
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});
