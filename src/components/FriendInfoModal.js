import React from "react";
import { StyleSheet, Text, Alert } from "react-native";
import { PreferencesContext } from "../utils/ThemeContext";
import { Button, Modal } from "react-native-paper";
import {Vibration} from "react-native";

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

  const _openAlert =()=>{
      Vibration.vibrate(100);
      createTwoButtonAlert()
    }

  const _closeModal = () => {
    // setAktiveFriendFunc(null);
      Vibration.vibrate(100);
    toggleInfoModal();
  };

  const _removeFriend = () => {
      Vibration.vibrate(100);
    removeFriend(aktiveFriend);
    //setAktiveFriendFunc(null);
    toggleInfoModal();

  };
  return (
    <Modal visible={true} contentContainerStyle={{ flex: 1 }}>
      <Text>{aktiveFriend.name.first}</Text>
      <Button onPress={() => _closeModal()}>Schließen</Button>
      <Button onPress={_openAlert}>Freund Entfernen</Button>
    </Modal>
  );
};

const styles = StyleSheet.create({});
