import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { FriendListItem } from "../components/FriendListItem";

export const FriendsScreen = () => {
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
      <FlatList
        data={friendsArray}
        renderItem={({ item }) => <FriendListItem friend={item} />}
        keyExtractor={(item) => item.firstname}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
