import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Text,
  Vibration,
} from "react-native";
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

  console.log(currentUserName);

  const _sendMessage = (text) => {
    const time = new Date();
    const timeDate = time.toLocaleString();
    const timeInSeconds = time.getTime();
    const textneu = {
      text: text,
      user: currentUserName,
      id: uuidv4(),
      timestamp: timeInSeconds,
      time: timeDate,
    };
    setMessages((messages) => [...messages, textneu]);
    console.log(messages);
    _sendMessageOnline(textneu);
    _getMessagesFromServer();
    Vibration.vibrate(50);
    setText("");
  };

  const _sendMessageOnline = async (message) => {
    await setDoc(doc(db, "MessagePool", `${message.timestamp}`), {
      id: message.id,
      text: message.text,
      user: message.user,
      time: message.time,
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
    const ownMessage = messagetext.user === currentUserName;
    console.log("Ownmessage: ", ownMessage);
    return (
      <View
        style={{
          marginVertical: 5,
        }}
      >
        <View
          style={{
            alignSelf: ownMessage ? "flex-end" : "flex-start",
            backgroundColor: ownMessage ? "lightgreen" : "lightblue",
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 15,
          }}
        >
          <Text style={{ textAlign: ownMessage ? "right" : "left" }}>
            {messagetext.text}
          </Text>
          <Text style={{ textAlign: ownMessage ? "right" : "left" }}>
            {messagetext.user}
          </Text>
        </View>
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
          paddingHorizontal: 15,
          marginBottom: 15,
          backgroundColor: "lightgrey",
        }}
      >
        <FlatList
          data={messages}
          renderItem={({ item }) => <MessagesField messagetext={item} />}
          keyExtractor={(item) => item.id}
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

/**
 *        <Button mode="contained" compact={true} onPress={() => toggleMessage()}>
          Löschen
        </Button>
 */
