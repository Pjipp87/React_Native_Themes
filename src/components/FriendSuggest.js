import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Surface, Text, Avatar, Title, IconButton } from "react-native-paper";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

export const FriendSuggest = ({ friend, onAdd }) => {
  const { name, picture } = friend;

  const { theme } = useTheme();

  const windowWidth = Dimensions.get("window").width;
  return (
    <Surface
      style={{
        marginVertical: 5,
        marginHorizontal: 5,
        paddingLeft: 20,
        width: windowWidth * 0.95,
        flex: 1,
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 5,
      }}
    >
      <Avatar.Image
        size={60}
        source={{
          uri: picture.large,
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
          <Title style={{ fontSize: 20, fontWeight: "bold" }}>
            {name.first} {name.last}
          </Title>
          <IconButton icon="account-plus" size={35} onPress={onAdd} />
        </View>
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

/**
 * <Pressable onPress={() => alert("Funktion: add")}>
            <Ionicons name="person-add" size={35} color="black" />
          </Pressable>
 */
