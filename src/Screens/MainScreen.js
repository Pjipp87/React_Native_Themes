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
  const { removeFriend, addFriend, friendArray } =
    React.useContext(PreferencesContext);
  const [tempItem, setTempItem] = useState(null);

  const onToggleSnackBar = (item) => {
    setVisibleSnackbar(!visibleSnackbar);
    setTempItem(item);
  };

  const onDismissSnackBar = () => setVisibleSnackbar(false);

  if (!isLogedIn) return <LoginModal />;

  const _getRandomUser = async () => {
    try {
      const response = await fetch(
        "https://randomuser.me/api/?results=50&gender=male"
      );
      const json = await response.json();
      //console.log(json.results[0].name.first);
      setfriendsSuggestion(json.results);
      setisLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    _getRandomUser();
    setTimeout(() => {
      setVisibleBanner(true);
    }, 1500);
  }, []);

  const _onAdd = (item) => {
    onToggleSnackBar(item);
    addFriend(item);
    Vibration.vibrate(100);
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
