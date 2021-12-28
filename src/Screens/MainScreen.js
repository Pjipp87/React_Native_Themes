import React from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components";
import { useTheme } from "react-native-paper";
import { Button } from "react-native-paper";
import { Text } from "react-native-paper";

export const MainScreen = (props) => {
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
      <Text>MainScreen</Text>
      <Button
        mode="contained"
        compact={true}
        raised
        color={colors.primary}
        theme={{ roundness: 3 }}
        onPress={() => alert("klappt")}
      >
        Main
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});
