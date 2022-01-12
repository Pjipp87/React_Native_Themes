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
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "./FireBaseScreen";

export const FriendsScreen = ({ navigation }) => {
  const {
    friendArray,
    showInfoModal,
    isSuggestionAtive,
    toggleSuggestion,
    currentUserName,
  } = React.useContext(PreferencesContext);

  useEffect(() => _getDataFromFirestore(), []);
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const [onlineArray, setOnlineArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userFriends, setuserFriends] = useState([]);

  const _switchScreens = () => {
    toggleSuggestion();
  };

  //#################### FireBase ########################

  const _getDataFromFirestore = async () => {
    let tempOnlineArray = [];
    let tempIDs = [];
    const querySnapshot = await getDocs(
      collection(
        db,
        `ChatPool`,
        `Users`,
        `${currentUserName}`,
        `Data`,
        `Freunde`
      )
    );
    querySnapshot.forEach((doc) => {
      tempIDs.push(doc.data().id);
      tempOnlineArray.push(doc.data());
    });
    setOnlineArray(tempOnlineArray);
    setuserFriends(tempIDs);
    //console.log("onlineArray: ", onlineArray);
  };

  //######################################################
  if (isSuggestionAtive) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FriendSuggestionScreen
          getDataFromFirestore={() => _getDataFromFirestore()}
          userFriends={userFriends}
        />
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
  } else if (showInfoModal) {
    return <FriendInfoModal getFromFirestore={() => _getDataFromFirestore()} />;
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

        <Button onPress={() => toggleSuggestion()}>Vorschläge anzeigen</Button>
      </View>
    );
  }
};

const styles = StyleSheet.create({});
//
