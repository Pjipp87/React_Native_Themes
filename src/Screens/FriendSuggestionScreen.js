import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Vibration,
  ScrollView,
  useWindowDimensions,
  Image,
  Pressable,
} from "react-native";
import styled from "styled-components";
import {
  useTheme,
  Snackbar,
  ActivityIndicator,
  Modal,
  Portal,
} from "react-native-paper";
import { Button, Headline, Avatar } from "react-native-paper";
import { Text, Banner } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";
import { LoginModal } from "../components/LoginModal";
import { FriendSuggest } from "../components/FriendSuggest";
import axios, { Axios } from "axios";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FriendSuggestionScreen = ({ scene, navigation, route }) => {
  const { colors } = useTheme();
  const { isLogedIn, toggleLogin } = React.useContext(PreferencesContext);
  const [visibleSnackbar, setVisibleSnackbar] = React.useState(false);
  const [visibleBanner, setVisibleBanner] = React.useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [friendsSuggestion, setfriendsSuggestion] = useState([]);
  const {
    removeFriend,
    addFriend,
    friendArray,
    setAktiveFriendFunc,
    userInformation,
  } = React.useContext(PreferencesContext);
  const [showProfilPicture, setShowProfilPicture] = useState(false);
  const [profilePicture, setprofilePicture] = useState("");

  const [tempItem, setTempItem] = useState(null);

  const onToggleSnackBar = (item) => {
    setVisibleSnackbar(!visibleSnackbar);
    setTempItem(item);
  };

  const window = useWindowDimensions();

  const onDismissSnackBar = () => setVisibleSnackbar(false);

  if (!isLogedIn) return <LoginModal />;

  // Fetch API
  const urls = [
    "https://goquotes-api.herokuapp.com/api/v1/random?count=20",
    "https://randomuser.me/api/?results=20&gender=male",
  ];

  const _getApiResponse = async () => {
    Promise.all(urls.map((endpoint) => axios.get(endpoint))).then(
      axios.spread((...allData) => {
        const quoteRes = allData[0].data.quotes;
        const userRes = allData[1].data.results;
        for (let index = 0; index < userRes.length; index++) {
          const friend = userRes[index];
          const quote = quoteRes[index];
          Object.assign(friend, quote);
        }
        setfriendsSuggestion(userRes);
        setisLoading(false);
      })
    );
  };

  useEffect(() => {
    _getApiResponse();
  }, [!friendsSuggestion]);

  //###################

  const _onAdd = (item) => {
    Vibration.vibrate(100);
    if (
      friendArray.findIndex((index) => index.login.uuid === item.login.uuid) ===
      -1
    ) {
      onToggleSnackBar(item);
      addFriend(item);
      setAktiveFriendFunc(item);
      if (friendsSuggestion.length !== 0) {
        let tempArray = friendsSuggestion;
        tempArray.splice(tempArray.indexOf(item), 1);
        setfriendsSuggestion(tempArray);
      }
    } else {
      alert("Kontakt bereits hinzugefügt!");
    }
  };

  const _refresh = () => {
    setisLoading(true);
    _getApiResponse();
  };

  const _showModal = (item) => {
    setShowProfilPicture(!showProfilPicture);
    if (item) {
      Vibration.vibrate(100);
      setprofilePicture(item);
    }
  };

  const LoadingScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} size={80} />
      </View>
    );
  };

  const SuggestionList = () => {
    return (
      <>
        <FlatList
          data={friendsSuggestion}
          renderItem={({ item }) => (
            <FriendSuggest
              friend={item}
              onAdd={() => _onAdd(item)}
              showModal={() => _showModal(item.picture.large)}
            />
          )}
          keyExtractor={(item) => item.login.uuid}
          refreshing={isLoading}
          onRefresh={() => _refresh()}
        />

        <Snackbar
          duration={3000}
          visible={visibleSnackbar}
          onDismiss={onDismissSnackBar}
          action={{
            label: "Rückgängig",
            onPress: () => removeFriend(tempItem),
          }}
        >
          Kontakt hinzugefügt
        </Snackbar>
      </>
    );
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Headline style={{ paddingVertical: 20, fontWeight: "bold" }}>
          Kontaktvorschläge
        </Headline>
        <Portal>
          <Modal
            visible={showProfilPicture}
            contentContainerStyle={{
              backgroundColor: "rgba(255, 0, 255, 0.0)",
              padding: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
            style={{
              padding: 0,
            }}
            onDismiss={() => _showModal()}
          >
            <Pressable onPress={() => _showModal()}>
              <Image
                source={{ uri: profilePicture }}
                style={{ width: 300, height: 300 }}
              ></Image>
            </Pressable>
          </Modal>
        </Portal>
        {isLoading ? <LoadingScreen /> : <SuggestionList />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
