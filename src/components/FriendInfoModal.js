import React from "react";
import { StyleSheet, Text, Alert } from "react-native";
import { PreferencesContext } from "../utils/ThemeContext";
import { Button, Modal } from "react-native-paper";

export const FriendInfoModal = () => {
  const {
    showInfoModal,
    toggleInfoModal,
    aktiveFriend,
    setAktiveFriendFunc,
    removeFriend,
  } = React.useContext(PreferencesContext);

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Achtung!",
      `${aktiveFriend.name.first} ${aktiveFriend.name.last} wird entfernt`,
      [
        {
          text: "Abbrechen",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => _removeFriend() },
      ]
    );

  const _closeModal = () => {
    // setAktiveFriendFunc(null);
    toggleInfoModal();
  };

  const _removeFriend = () => {
    removeFriend(aktiveFriend);
    //setAktiveFriendFunc(null);
    toggleInfoModal();
  };
  return (
    <Modal visible={true} contentContainerStyle={{ flex: 1 }}>
      <Text>{aktiveFriend.name.first}</Text>
      <Button onPress={() => _closeModal()}>Schließen</Button>
      <Button onPress={createTwoButtonAlert}>Freund Entfernen</Button>
    </Modal>
  );
};

const styles = StyleSheet.create({});
