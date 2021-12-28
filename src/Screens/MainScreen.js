import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components";
import { useTheme } from "react-native-paper";
import { Button } from "react-native-paper";
import { Text } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";
import { LoginModal } from "../components/LoginModal";

export const MainScreen = ({ scene }) => {
  const { isLogedIn, toggleLogin } = React.useContext(PreferencesContext);
  console.log(isLogedIn);

  if (!isLogedIn) return <LoginModal />;

  return (
    <View>
      <Text>MainScreen </Text>
      <Button
        mode="contained"
        compact={true}
        icon="home"
        onPress={() => toggleLogin()}
      >
        Main
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});
