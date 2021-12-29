import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import styled from "styled-components";
import { useTheme } from "react-native-paper";
import { Button } from "react-native-paper";
import { Text } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";
import { LoginModal } from "../components/LoginModal";
import { FriendSuggest } from "../components/FriendSuggest";

export const MainScreen = ({ scene }) => {
  const { isLogedIn, toggleLogin } = React.useContext(PreferencesContext);

  if (!isLogedIn) return <LoginModal />;

  const friendsArray = [
    {
      firstname: "John",
      lastname: "Doe",
      status: "No Status aviable",
      picture: "https://reactnative.dev/img/tiny_logo.png",
      email: "JohnDoe@unknown.com",
      dateOfBirth: "01.01.1980",
    },
    {
      firstname: "Jane",
      lastname: "Bla",
      status: "out for a walk",
      picture: "https://reactnative.dev/img/tiny_logo.png",
      email: "JaneBlae@unknown.com",
      dateOfBirth: "02.02.1990",
    },
  ];

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>MainScreen</Text>

      <FlatList
        data={friendsArray}
        renderItem={({ item }) => <FriendSuggest friend={item} />}
        keyExtractor={(item) => item.firstname}
      />
      <Button
        mode="contained"
        compact={true}
        icon="home"
        onPress={() => toggleLogin()}
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});
