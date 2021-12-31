import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FriendListItem } from "../components/FriendListItem";
import { PreferencesContext } from "../utils/ThemeContext";

export const FriendsScreen = () => {
  const { friendArray } = React.useContext(PreferencesContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={friendArray}
        renderItem={({ item }) => <FriendListItem friend={item} />}
        keyExtractor={(item) => item.login.uuid}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
