import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Vibration,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components";
import { useTheme, Snackbar, ActivityIndicator } from "react-native-paper";
import { Button, Headline, Avatar } from "react-native-paper";
import { Text, Banner } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";
import { LoginModal } from "../components/LoginModal";
import { FriendSuggest } from "../components/FriendSuggest";
import axios, { Axios } from "axios";
import * as Device from "expo-device";

export const MainScreen = ({ scene, navigation, route }) => {
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
    setTimeout(() => {
      setVisibleBanner(true);
    }, 1500);
  }, []);

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
            <FriendSuggest friend={item} onAdd={() => _onAdd(item)} />
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
      <Banner
        visible={visibleBanner}
        style={{ backgroundColor: colors.notification }}
        actions={[
          {
            label: "Verstanden",
            onPress: () => setVisibleBanner(false),
          },
        ]}
      >
        Die App befindet sich aktuell in Entwicklung
      </Banner>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <Headline
            style={{
              textAlign: "center",
              paddingVertical: 30,
              fontWeight: "bold",
              letterSpacing: 3,
              fontSize: 40,
            }}
          >
            Profil
          </Headline>
          <View
            style={{
              width: window.width,
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingBottom: 20,
            }}
          >
            <Avatar.Image
              size={120}
              style={{ marginHorizontal: 30 }}
              source={{
                uri: userInformation.image,
              }}
            />
            <View style={{ justifyContent: "space-evenly" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Benutzername
              </Text>
              <Text>{userInformation.userName}</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Name</Text>
              <Text>
                {userInformation.firstName} {userInformation.lastName}
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Smartphone Model:
              </Text>
              <Text>{Device.modelName}</Text>
            </View>
          </View>
          <Button
            onPress={() => navigation.navigate("Registrierung")}
            style={{ paddingBottom: 20 }}
          >
            Profil ändern
          </Button>
        </View>

        <Headline style={{ paddingVertical: 20, fontWeight: "bold" }}>
          Kontaktvorschläge
        </Headline>
        {isLoading ? <LoadingScreen /> : <SuggestionList />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

/**
 *         <Button
          mode="contained"
          compact={true}
          icon="home"
          onPress={() => toggleLogin()}
        >
          Logout
        </Button>
 */
