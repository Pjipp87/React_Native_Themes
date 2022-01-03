import React from "react";
import { StyleSheet, Text, Alert, View } from "react-native";
import { PreferencesContext } from "../utils/ThemeContext";
import { Button, Modal } from "react-native-paper";
import { Vibration } from "react-native";
import { useTheme } from "react-native-paper";

export const FriendInfoModal = ({ scene }) => {
  const {
    showInfoModal,
    toggleInfoModal,
    aktiveFriend,
    setAktiveFriendFunc,
    removeFriend,
  } = React.useContext(PreferencesContext);
  const { colors } = useTheme();

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

  const _openAlert = () => {
    Vibration.vibrate(100);
    createTwoButtonAlert();
  };

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
    <Modal
      visible={true}
      contentContainerStyle={{ flex: 0.8, backgroundColor: colors.background }}
    >
      <View style={{ flex: 1, paddingTop: 25 }}>
        <Text style={{ color: colors.text, textAlign: "center" }}>
          {aktiveFriend.name.first} {aktiveFriend.name.last}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-evenly",
          marginBottom: 25,
        }}
      >
        <Button
          mode="contained"
          raised
          compact={true}
          onPress={() => _closeModal()}
        >
          Zurück
        </Button>
        <Button
          compact={true}
          mode="contained"
          raised
          style={{ backgroundColor: colors.notification }}
          onPress={_openAlert}
        >
          Freund Entfernen
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});
