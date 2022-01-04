import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Switch, TouchableRipple, Text, useTheme } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";

export const SettingsScreen = ({ scene }) => {
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

  return (
    <View>
      <Text style={{ textAlign: "center" }}>Einstellungen</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text>Darkmode:</Text>
        <Switch
          color={"red"}
          value={isThemeDark}
          onValueChange={() => toggleTheme()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
//Test
