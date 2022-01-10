import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Surface, Text, Avatar, Title, IconButton } from "react-native-paper";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

export const GoogleFriends = ({ friend, onAdd, showModal }) => {
  const { name, picture } = friend;

  const { theme } = useTheme();

  const windowWidth = Dimensions.get("window").width;
  return (
    <Surface
      style={{
        marginVertical: 5,
        marginHorizontal: 5,
        width: windowWidth * 0.95,
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 5,
      }}
    >
      <Pressable onPress={showModal}>
        <Avatar.Image
          size={60}
          source={{
            uri: picture.large,
          }}
        />
      </Pressable>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Title
            style={{
              flex: 1,
              paddingLeft: 25,
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
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
