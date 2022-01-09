import React, { useState, useEffect, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FriendListItem } from "../components/FriendListItem";
import { PreferencesContext } from "../utils/ThemeContext";
import { Modal } from "react-native-paper";
import { Text, Button } from "react-native-paper";
import { FriendInfoModal } from "../components/FriendInfoModal";
import { useLinkTo } from "@react-navigation/native";
import { FriendSuggestionScreen } from "./FriendSuggestionScreen";
import { Loading } from "../components/Loading";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./FireBaseScreen";

export const FriendsScreen = ({ navigation }) => {
  const { friendArray } = React.useContext(PreferencesContext);

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const [toggleSuggests, setToggleSuggests] = useState(false);
  const [onlineArray, setOnlineArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const _switchScreens = () => {
    setToggleSuggests(!toggleSuggests);
    _getDataFromFirestore();
  };
  //#################### FireBase ########################

  const _getDataFromFirestore = async () => {
    let tempOnlineArray = [];
    const querySnapshot = await getDocs(collection(db, "Friends"));
    querySnapshot.forEach((doc) => {
      tempOnlineArray.push(doc.data());
    });
    setOnlineArray(tempOnlineArray);
    console.log("onlineArray: ", onlineArray);
  };

  useEffect(() => _getDataFromFirestore(), []);

  //######################################################
  if (toggleSuggests) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FriendSuggestionScreen></FriendSuggestionScreen>
        <Button onPress={() => _switchScreens()}>Zurück</Button>
      </View>
    );
  }

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  if (onlineArray.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 36, fontStyle: "italic" }}>
          Noch keine Kontakte
        </Text>
        <Button onPress={() => _switchScreens()}>Vorschläge anzeigen</Button>
        <Button onPress={() => _getDataFromFirestore()}>Aktualisieren</Button>
      </View>
    );
  }

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FlatList
          data={onlineArray}
          renderItem={({ item }) => (
            <FriendListItem
              friend={item}
              firebase={() => _getDataFromFirestore}
            />
          )}
          keyExtractor={(item) => item.id}
        />

        <Button onPress={() => _switchScreens()}>Vorschläge anzeigen</Button>
        <Button onPress={() => _getDataFromFirestore()}>FireStore</Button>
      </View>
    );
  }
};

const styles = StyleSheet.create({});
//
