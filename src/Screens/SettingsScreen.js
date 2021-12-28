import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { Text } from "react-native-paper";
import { Switch } from "react-native-paper";

export const SettingsScreen = ({ theme }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <Text>Settings:</Text>
      <Button
        mode="contained"
        compact={true}
        raised
        color={colors.primary}
        theme={{ roundness: 3 }}
        onPress={() => alert("klappt")}
      >
        Klick mich
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});
