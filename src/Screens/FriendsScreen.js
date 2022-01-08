import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FriendListItem } from "../components/FriendListItem";
import { PreferencesContext } from "../utils/ThemeContext";
import { Modal } from "react-native-paper";
import { Text, Button } from "react-native-paper";
import { FriendInfoModal } from "../components/FriendInfoModal";
import { useLinkTo } from "@react-navigation/native";
import { FriendSuggestionScreen } from "./FriendSuggestionScreen";

export const FriendsScreen = ({ navigation }) => {
  const { friendArray } = React.useContext(PreferencesContext);

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const [toggleSuggests, setToggleSuggests] = useState(false);

  const _switchScreens = () => {
    setToggleSuggests(!toggleSuggests);
  };

  if (toggleSuggests) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FriendSuggestionScreen></FriendSuggestionScreen>
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
