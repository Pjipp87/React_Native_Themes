import React, { useState, useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FriendListItem } from "../components/FriendListItem";
import { PreferencesContext } from "../utils/ThemeContext";
import { Modal } from "react-native-paper";
import { Text } from "react-native-paper";
import { FriendInfoModal } from "../components/FriendInfoModal";

export const FriendsScreen = () => {
  const { friendArray, showInfoModal, toogleInfoModal, quotes } =
    React.useContext(PreferencesContext);

  if (showInfoModal) return <FriendInfoModal />;

  if (friendArray.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 36, fontStyle: "italic" }}>
          Noch keine Kontakte
        </Text>
      </View>
    );
  }

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
