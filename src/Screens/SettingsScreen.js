import React from "react";
import { StyleSheet, View } from "react-native";

import { Switch, TouchableRipple, Text, useTheme } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";

export const SettingsScreen = ({ scene }) => {
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

  return (
    <View>
      <Text>Settings:</Text>
      <TouchableRipple onPress={() => toggleTheme()}>
        <Switch
          style={[{ backgroundColor: theme.colors.accent }]}
          color={"red"}
          value={isThemeDark}
        />
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({});
