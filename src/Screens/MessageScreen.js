import React, { useState } from "react";
import { StyleSheet, View, Image, FlatList, Text } from "react-native";
import { Button, Headline, TextInput } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";
import { useWindowDimensions } from "react-native";
import { v4 as uuidv4 } from "uuid";

export const MessageScreen = () => {
  const { toggleMessage, currentUserName } =
    React.useContext(PreferencesContext);
  const [text, setText] = React.useState("");
  const [messages, setMessages] = useState([]);

  // Online Funktion integrieren (auch bei _sendMassge!)
  // NewMessage Badge integrieren (vllt über TOGGLEMESSAGE (0 Nachichten === false))

  const _sendMessage = (text) => {
    const textneu = { text: text, name: currentUserName, id: uuidv4() };
    setMessages((messages) => [...messages, textneu]);
    setText("");
    console.log("messages4", messages);
  };

  const MessagesField = ({ messagetext }) => {
    let messageSide;
    let name;
    if (messagetext.name === currentUserName) {
      messageSide = "right";
      name = "Ich";
    } else {
      messageSide = "left";
      name = messagetext.name;
    }

    return (
      <View style={{ width: "100%" }}>
        <Text style={{ textAlign: messageSide }}>{messagetext.text}</Text>
        <Text style={{ textAlign: messageSide }}>Ich</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", paddingVertical: 15 }}>
      <Headline style={{ fontWeight: "bold", letterSpacing: 5 }}>
        Nachrichten
      </Headline>

      <View
        style={{
          width: useWindowDimensions().width,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 15,
          backgroundColor: "lightgrey",
        }}
      >
        <Button mode="contained" compact={true} onPress={() => toggleMessage()}>
          Löschen
        </Button>

        <FlatList
          data={messages}
          renderItem={({ item }) => <MessagesField messagetext={item} />}
          keyExtractor={(item) => item.id}
          style={{ width: "90%", flexDirection: "column-reverse" }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 5,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            height: 40,
            marginRight: 5,
            backgroundColor: "white",
          }}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder="Nachricht"
        />
        <Button
          mode="contained"
          icon="send"
          style={{ height: "100%" }}
          onPress={() => _sendMessage(text)}
        >
          Senden
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
