import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Vibration } from "react-native";
import styled from "styled-components";
import { useTheme, Snackbar, ActivityIndicator } from "react-native-paper";
import { Button, Headline } from "react-native-paper";
import { Text, Banner } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";
import { LoginModal } from "../components/LoginModal";
import { FriendSuggest } from "../components/FriendSuggest";

export const MainScreen = ({ scene }) => {
  const { colors } = useTheme();
  const { isLogedIn, toggleLogin } = React.useContext(PreferencesContext);
  const [visibleSnackbar, setVisibleSnackbar] = React.useState(false);
  const [visibleBanner, setVisibleBanner] = React.useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [friendsSuggestion, setfriendsSuggestion] = useState([]);
  const { removeFriend, addFriend, friendArray, setAktiveFriendFunc } =
    React.useContext(PreferencesContext);
  const [tempItem, setTempItem] = useState(null);

  const [quotes, setQuotes] = useState([]);

  const onToggleSnackBar = (item) => {
    setVisibleSnackbar(!visibleSnackbar);
    setTempItem(item);
  };

  const onDismissSnackBar = () => setVisibleSnackbar(false);

  if (!isLogedIn) return <LoginModal />;

  /**
 * 
 *   const _getRandomUser = async () => {
    try {
      const response = await fetch(
        "https://randomuser.me/api/?results=20&gender=male"
      );
      const json = await response.json();
      const responseQuote = await fetch(
        "https://goquotes-api.herokuapp.com/api/v1/random?count=20"
      );
      const jsonQuote = await responseQuote.json();
      setQuotes(jsonQuote.quotes);
      setfriendsSuggestion(json.results);
      setisLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const _mergeArrays = async () => {
    for (let index = 0; index < friendsSuggestion.length; index++) {
      const friend = friendsSuggestion[index];
      const quote = quotes[index];
      Object.assign(friend, quote);
    }
    console.log(friendsSuggestion);
    setfriendsSuggestion(friendsSuggestion);
  };

  /**
   * const _getQuote = async () => {
    try {
      const responseQuote = await fetch(
        "https://goquotes-api.herokuapp.com/api/v1/random?count=5"
      );
      const jsonQuote = await responseQuote.json();
      setQuotes(jsonQuote.quotes);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    //_getQuote();
    _getRandomUser();
    _mergeArrays();
    setTimeout(() => {
      setVisibleBanner(true);
    }, 1500);
  }, []);
 */

  const _onAdd = (item, quote) => {
    Vibration.vibrate(100);
    if (
      friendArray.findIndex((index) => index.login.uuid === item.login.uuid) ===
      -1
    ) {
      onToggleSnackBar(item);
      addFriend(item);
      setAktiveFriendFunc(quote);
    } else {
      alert("Kontakt bereits hinzugefügt!");
    }
  };

  const _refresh = () => {
    setisLoading(true);
    _getRandomUser();
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} size={80} />
      </View>
    );
  }

  return (
    <>
      <Banner
        visible={visibleBanner}
        style={{ backgroundColor: colors.error }}
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
        <Headline style={{ paddingVertical: 20, fontWeight: "bold" }}>
          Kontaktvorschläge
        </Headline>

        <FlatList
          data={friendsSuggestion}
          renderItem={({ item }) => (
            <FriendSuggest friend={item} onAdd={() => _onAdd(item)} />
          )}
          keyExtractor={(item) => item.login.uuid}
          refreshing={isLoading}
          onRefresh={() => _refresh()}
        />

        <Button
          mode="contained"
          compact={true}
          icon="home"
          onPress={() => toggleLogin()}
        >
          Logout
        </Button>

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
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
