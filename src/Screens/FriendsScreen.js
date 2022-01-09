import React, { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

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

  //#################### FireBase ########################

  const _getDataFromFirestore = async () => {
    const querySnapshot = await getDocs(collection(db, "Friends"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      setOnlineArray((onlineArray) => [...onlineArray], [doc.data()]);
      console.log(onlineArray);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    _getDataFromFirestore();
  }, []);

  //######################################################

  /**
   * if (onlineArray.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 36, fontStyle: "italic" }}>
          Noch keine Kontakte
        </Text>
        <Button onPress={() => _switchScreens()}>Vorschläge anzeigen</Button>
      </View>
    );
  }
   */

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={onlineArray}
        renderItem={({ item }) => <FriendListItem friend={item} />}
        keyExtractor={(item) => item.login.uuid}
      />

      <Button onPress={() => _switchScreens()}>Vorschläge anzeigen</Button>
      <Button onPress={() => _getDataFromFirestore()}>FireStore</Button>
    </View>
  );
};

const styles = StyleSheet.create({});
//
