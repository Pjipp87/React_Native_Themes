import React from "react";
import { StyleSheet, Text, View } from "react-native";
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

  const _closeModal = () => {
    setAktiveFriendFunc(null);
    toggleInfoModal();
  };

  const _removeFriend = () => {
    setAktiveFriendFunc(null);
    toggleInfoModal();
    removeFriend(aktiveFriend);
  };
  return (
    <Modal visible={true} contentContainerStyle={{ flex: 1 }}>
      <Text>{aktiveFriend.name.first}</Text>
      <Button onPress={() => _closeModal()}>Schließen</Button>
      <Button onPress={() => _removeFriend()}>Freund Entfernen</Button>
    </Modal>
  );
};

const styles = StyleSheet.create({});
