import React, { useState, useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FriendListItem } from "../components/FriendListItem";
import { PreferencesContext } from "../utils/ThemeContext";
import { Modal } from "react-native-paper";
import { Text, Button } from "react-native-paper";
import { FriendInfoModal } from "../components/FriendInfoModal";
import { useLinkTo } from "@react-navigation/native";
import { FriendSuggestionScreen } from "./FriendSuggestionScreen";
import { NewsScreen } from "./NewsScreen";

export const FriendsScreen = ({ navigation }) => {
  const { friendArray, showInfoModal, toogleInfoModal, quotes } =
    React.useContext(PreferencesContext);

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  if (showInfoModal) return <FriendInfoModal />;
  const [toggleSuggests, setToggleSuggests] = useState(false);

  const _switchScreens = () => {
    setToggleSuggests(!toggleSuggests);
  };

  if (toggleSuggests) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <NewsScreen></NewsScreen>
        <Button onPress={() => _switchScreens()}>Zurück</Button>
      </View>
    );
  }

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  if (friendArray.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 36, fontStyle: "italic" }}>
          Noch keine Kontakte
        </Text>
        <Button onPress={() => _switchScreens()}>Vorschläge anzeigen</Button>
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

      <Button onPress={() => _switchScreens()}>Vorschläge anzeigen</Button>
    </View>
  );
};

const styles = StyleSheet.create({});
//
