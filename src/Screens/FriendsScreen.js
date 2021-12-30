import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { FriendListItem } from "../components/FriendListItem";
import { PreferencesContext } from "../utils/ThemeContext";

export const FriendsScreen = () => {
  const { friendArray, addFriend } = React.useContext(PreferencesContext);
  /**
 *   const friendsArray = [
    {
      firstname: "John",
      lastname: "Doe",
      status: "No Status aviable",
      picture: "https://reactnative.dev/img/tiny_logo.png",
      email: "JohnDoe@unknown.com",
      dateOfBirth: "01.01.1980",
    },
    {
      firstname: "Jane",
      lastname: "Bla",
      status: "out for a walk",
      picture: "https://reactnative.dev/img/tiny_logo.png",
      email: "JaneBlae@unknown.com",
      dateOfBirth: "02.02.1990",
    },
  ];
 */

  /**
  *  const friendsArray = [
    {
      gender: "male",
      name: {
        title: "Mr",
        first: "Sixto",
        last: "Duarte",
      },
      location: {
        street: {
          number: 9788,
          name: "Rua Dezessete ",
        },
        city: "Pouso Alegre",
        state: "Pernambuco",
        country: "Brazil",
        postcode: 76257,
        coordinates: {
          latitude: "-74.2700",
          longitude: "-37.5077",
        },
        timezone: {
          offset: "+6:00",
          description: "Almaty, Dhaka, Colombo",
        },
      },
      email: "sixto.duarte@example.com",
      login: {
        uuid: "e6cf4b9b-d983-40b7-82a5-cc19b4677891",
        username: "redgoose777",
        password: "blackcat",
        salt: "2MHpdREs",
        md5: "ff5ee5693931663896f6e7130a5912cc",
        sha1: "3d28369046a8e46162ec40512876f66b23c17354",
        sha256:
          "328f866e4ef9fb586a8c5695286abceab7e0fc585afc5b1599c6635653a9feec",
      },
      dob: {
        date: "1987-08-19T13:59:02.524Z",
        age: 34,
      },
      registered: {
        date: "2003-06-11T02:27:10.288Z",
        age: 18,
      },
      phone: "(72) 4445-6119",
      cell: "(77) 9887-0527",
      id: {
        name: "",
        value: null,
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/57.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/57.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/57.jpg",
      },
      nat: "BR",
    },
  ];
  */

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={friendArray}
        renderItem={({ item }) => <FriendListItem friend={item} />}
        keyExtractor={(item) => item.login.uuid}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
