import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { useTheme, Modal, Portal } from "react-native-paper";
import { Button, Headline, Avatar, TextInput, Text } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./FireBaseScreen";
import { db } from "./FireBaseScreen";
import {
  setDoc,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

export const MainScreen = ({ route }) => {
  const { colors } = useTheme();
  const { setStatusFunc, currentUserName, setCurrentUsernameFunc } =
    React.useContext(PreferencesContext);
  const [currentUserData, setCurrentUserData] = useState({});
  const [statusModal, setStatusModal] = useState(false);
  const [statusMessage, setstatusMessage] = useState("");
  const [newStatusMessage, setnewStatusMessage] = useState("");
  const window = useWindowDimensions();
  const { setIsAuthenticated } = route.params;

  useEffect(() => {
    _getStatusUpdate();
    _getUserFromFirebase();
  }, []);

  //useMemo(() => _getStatusUpdate(), []);
  //useMemo(() => _getStatusUpdate, []);

  const _getUserFromFirebase = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //console.log(user);
        _getStatusUpdate();
        setCurrentUsernameFunc(user.email);
        setCurrentUserData({
          name: user.displayName,
          username: user.email,
          picture: user.photoURL,
          id: user.uid,
        });

        _setFriendOnline(user);
        _setUserList(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  };

  const _setFriendOnline = async (user) => {
    try {
      await setDoc(
        doc(db, `ChatPool`, `Users`, `${currentUserName}`, `Profil`),
        {
          name: user.displayName,
          username: user.email,
          picture: user.photoURL,
          id: user.uid,
        }
      );
      console.log("saved User");
    } catch (error) {
      console.log(error);
    }
  };

  const _setUserList = async (user) => {
    try {
      await setDoc(doc(db, `Users`, `${currentUserName}`), {
        name: user.displayName,
        username: user.email,
        picture: user.photoURL,
        id: user.uid,
      });
      console.log("saved User on List");
    } catch (error) {
      console.log(error);
    }
  };

  const _showStatusModal = () => {
    setStatusModal(!statusModal);
  };

  const _getStatusUpdate = async () => {
    const querySnapshot = await getDoc(
      doc(db, `ChatPool`, `Users`, `${currentUserName}`, `Status`)
    );
    setstatusMessage(querySnapshot.data().status);
  };

  const _setStatus = () => {
    _setStatusOnline(newStatusMessage);
    _getStatusUpdate();
    setStatusModal(!statusModal);
    setnewStatusMessage("");
  };

  const _setStatusOnline = async (statusMessage) => {
    try {
      await setDoc(
        doc(db, `ChatPool`, `Users`, `${currentUserName}`, `Status`),
        {
          status: statusMessage,
        }
      );
      console.log("saved Status");
    } catch (error) {
      console.log(error);
    }
  };

  const _logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Benutzer ausgeloggt");
        setIsAuthenticated();
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          paddingTop: 25,
          alignItems: "center",
        }}
      >
        <View>
          <Portal>
            <Modal
              visible={statusModal}
              contentContainerStyle={{
                backgroundColor: colors.background,
                padding: 20,
              }}
              style={{
                padding: 0,
              }}
              onDismiss={() => _showStatusModal()}
            >
              <Text
                style={{
                  paddingBottom: 20,
                  fontSize: 30,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Neuer Status
              </Text>
              <TextInput
                mode="outlined"
                label="Neuer Status"
                value={newStatusMessage}
                multiline={true}
                onChangeText={(status) => setnewStatusMessage(status)}
                style={{ height: 190 }}
              />
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "space-around",
                  alignItems: "center",
                  paddingTop: 20,
                }}
              >
                <Button
                  mode="contained"
                  onPress={() => _setStatus(statusMessage)}
                >
                  Speichern
                </Button>
                <Button mode="contained" onPress={() => _showStatusModal()}>
                  Abbrechen
                </Button>
              </View>
            </Modal>
          </Portal>
          <Headline
            style={{
              textAlign: "center",
              paddingVertical: 30,
              fontWeight: "bold",
              letterSpacing: 3,
              fontSize: 40,
            }}
          >
            Profil
          </Headline>
          <View
            style={{
              width: window.width,
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingBottom: 20,
            }}
          >
            <View
              style={{ paddingLeft: 10, paddingRight: 20, paddingVertical: 20 }}
            >
              <Avatar.Image
                size={120}
                style={{ marginHorizontal: 30 }}
                source={{
                  uri: currentUserData.picture,
                }}
              />
            </View>
            <View style={{ justifyContent: "space-evenly" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Benutzername
              </Text>
              <Text>{currentUserName}</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Name</Text>
              <Text>{currentUserData.name}</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Smartphone Model:
              </Text>
              <Text>{Device.modelName}</Text>
            </View>
          </View>
          <View style={{ paddingVertical: 30, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Status:</Text>
            <Text style={{ fontSize: 18 }}>{statusMessage}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
              alignSelf: "center",
              paddingBottom: 20,
            }}
          >
            <Button onPress={() => _logOut()} color="red">
              Logout
            </Button>
            <Button onPress={() => _showStatusModal()}>Status ändern</Button>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
