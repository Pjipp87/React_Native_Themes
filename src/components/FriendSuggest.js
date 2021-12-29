import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const FriendSuggest = ({ friend }) => {
  const { firstname, lastname, status, picture, email, dateOfBirth } = friend;

  const windowWidth = Dimensions.get("window").width;
  return (
    <View
      style={{
        paddingLeft: 20,
        width: windowWidth,
        flex: 1,
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Image
        style={styles.tinyLogo}
        source={{
          uri: picture,
        }}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {firstname} {lastname}
          </Text>
          <Pressable onPress={() => alert("Funktion: add")}>
            <Ionicons name="person-add" size={35} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 80,
    height: 80,
  },
});
