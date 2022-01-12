import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, FlatList, Text } from "react-native";
import { Button, Headline, TextInput } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";
import { useWindowDimensions } from "react-native";
import { v4 as uuidv4 } from "uuid";
import { db } from "./FireBaseScreen";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";

export const MessageScreen = () => {
  const { toggleMessage, currentUserName } =
    React.useContext(PreferencesContext);
  const [text, setText] = React.useState("");
  const [messages, setMessages] = useState([]);
  const [messagesFromServer, setMessagesFromServer] = useState([]);

  // Online Funktion integrieren (auch bei _sendMassge!)
  // NewMessage Badge integrieren (vllt über TOGGLEMESSAGE (0 Nachichten === false))

  useEffect(() => {
    _getMessagesFromServer();
  }, []);

  const _sendMessage = (text) => {
    const time = new Date();
    const timeInSeconds = time.getTime();
    const textneu = {
      text: text,
      user: currentUserName,
      id: uuidv4(),
      time: timeInSeconds,
    };
    setMessages((messages) => [...messages, textneu]);
    console.log(messages);
    _sendMessageOnline(textneu);
    _getMessagesFromServer();
    setText("");
  };

  const _sendMessageOnline = async (message) => {
    await setDoc(doc(db, "MessagePool", `${message.time}`), {
      id: message.id,
      text: message.text,
      user: message.user,
    });
  };

  const _getMessagesFromServer = async () => {
    let tempMessages = [];
    let tempIDs = [];
    const querySnapshot = await getDocs(collection(db, "MessagePool"));
    querySnapshot.forEach((doc) => {
      tempMessages.push(doc.data());
    });
    setMessages(tempMessages);
  };

  const MessagesField = ({ messagetext }) => {
    return (
      <View style={{ width: "100%", paddingVertical: 5 }}>
        <Text>{messagetext.text}</Text>
        <Text>{messagetext.user}</Text>
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
