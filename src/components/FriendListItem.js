import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, View, Vibration } from "react-native";
import { Text, Surface, Avatar, IconButton } from "react-native-paper";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { PreferencesContext } from "../utils/ThemeContext";

export const FriendListItem = ({ friend }) => {
  const { first, last, picture, email, status } = friend;

  const { toggleInfoModal, setAktiveFriendFunc } =
    React.useContext(PreferencesContext);

  const _showInfo = () => {
    Vibration.vibrate(50);
    setAktiveFriendFunc(friend);
    toggleInfoModal();
  };

  const windowWidth = Dimensions.get("window").width;
  return (
    <Surface
      style={{
        flex: 1,
        elevation: 5,
        width: windowWidth * 0.95,
        marginHorizontal: 5,
        marginTop: 15,
      }}
    >
      <View
        style={{
          paddingHorizontal: 15,
          flex: 1,
          paddingVertical: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar.Image
          size={60}
          source={{
            uri: picture,
          }}
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{ paddingLeft: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {first} {last}
            </Text>

            <Text
              style={{ fontSize: 14, fontStyle: "italic", marginVertical: 5 }}
            >
              {email}
            </Text>
            <Text style={{ fontSize: 16, textAlign: "center" }}>{status}</Text>
          </View>
        </View>
        <IconButton
          icon="information-outline"
          size={35}
          onPress={() => _showInfo()}
        />
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 80,
    height: 80,
  },
});
