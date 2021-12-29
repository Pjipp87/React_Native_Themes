import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Image } from "react-native";
import { Dimensions } from "react-native";

export const FriendListItem = ({ friend }) => {
  const { firstname, lastname, status, picture, email, dateOfBirth } = friend;

  const windowWidth = Dimensions.get("window").width;
  return (
    <Pressable
      onPress={() =>
        alert(
          firstname + " " + lastname + " hat am " + dateOfBirth + " Geburtstag"
        )
      }
    >
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
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {firstname} {lastname}
            </Text>

            <Text style={{ fontSize: 14, fontStyle: "italic" }}>{email}</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{status}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 80,
    height: 80,
  },
});
