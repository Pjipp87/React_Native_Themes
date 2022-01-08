import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable, useWindowDimensions } from "react-native";
import styled from "styled-components";
import {
  useTheme,
  Snackbar,
  ActivityIndicator,
  Modal,
  Portal,
} from "react-native-paper";
import { Button, Headline, Avatar, TextInput } from "react-native-paper";
import { Text, Banner } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";
import { LoginModal } from "../components/LoginModal";
import { FriendSuggest } from "../components/FriendSuggest";
import axios, { Axios } from "axios";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export const MainScreen = ({ scene, navigation, route }) => {
  const { colors } = useTheme();

  const { isLogedIn, toggleLogin, setStatusFunc, setUserinformationFunc } =
    React.useContext(PreferencesContext);
  const [visibleBanner, setVisibleBanner] = React.useState(false);
  const [currentUserData, setCurrentUserData] = useState({});
  const [statusModal, setStatusModal] = useState(false);
  const [statusMessage, setstatusMessage] = useState("");
  const [newStatusMessage, setnewStatusMessage] = useState("");
  const [newImage, setNewImage] = useState(null);

  const window = useWindowDimensions();

  if (!isLogedIn) return <LoginModal />;

  const _getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("User");
      console.log("geklappt:", JSON.parse(jsonValue));
      const userdata = JSON.parse(jsonValue);
      if (userdata != null) {
        return setCurrentUserData(userdata);
      } else {
        return setCurrentUserData({
          firstname: "",
          lastname: "",
          username: "",
          password: "",
          picture: "../../mock/Image/ProfilePicture.png",
          status: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const _getStatusUpdate = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("Status");
      console.log("geklappt:", JSON.parse(jsonValue));
      const newStatus = JSON.parse(jsonValue);
      if (newStatus != null) {
        return setstatusMessage(newStatus);
      } else {
        return setstatusMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isFocused = navigation.isFocused();
  useEffect(() => {
    isFocused ? _getUserData() : null;
    isFocused ? _getStatusUpdate() : null;
    setTimeout(() => {
      setVisibleBanner(true);
    }, 1500);
  }, [!currentUserData, !statusMessage]);

  //###################

  const _showStatusModal = () => {
    setStatusModal(!statusModal);
  };

  const _setStatus = () => {
    setStatusFunc(newStatusMessage);
    setStatusModal(!statusModal);
    setnewStatusMessage("");
  };

  return (
    <>
      <Banner
        visible={visibleBanner}
        style={{ backgroundColor: colors.notification }}
        actions={[
          {
            label: "Verstanden",
            onPress: () => setVisibleBanner(false),
          },
        ]}
      >
        Die App befindet sich aktuell in Entwicklung
      </Banner>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <Portal>
            <Modal
              visible={statusModal}
              contentContainerStyle={{
                backgroundColor: "white",
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
            <View style={{ paddingLeft: 10, paddingRight: 20 }}>
              <Avatar.Image
                size={120}
                style={{ marginHorizontal: 30 }}
                source={{
                  uri: currentUserData.image,
                }}
              />
              <Button
                mode="contained"
                compact={true}
                onPress={pickImage}
                style={{ marginTop: 20 }}
              >
                Pofilbild ändern
              </Button>
            </View>
            <View style={{ justifyContent: "space-evenly" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Benutzername
              </Text>
              <Text>{currentUserData.userName}</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Name</Text>
              <Text>
                {currentUserData.firstName} {currentUserData.lastName}
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Smartphone Model:
              </Text>
              <Text>{Device.modelName}</Text>
            </View>
          </View>
          <View style={{ paddingVertical: 50 }}>
            <Text>Status:</Text>
            <Text>{statusMessage}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onPress={() =>
                navigation.navigate("Registrierung", {
                  currentData: currentUserData,
                })
              }
            >
              Profil ändern
            </Button>
            <Button onPress={() => _showStatusModal()}>Status ändern</Button>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

/**
 *         <Button
          mode="contained"
          compact={true}
          icon="home"
          onPress={() => toggleLogin()}
        >
          Logout
        </Button>
 */

/**
         *  <Headline style={{ paddingVertical: 20, fontWeight: "bold" }}>
          Kontaktvorschläge
        </Headline>
        {isLoading ? <LoadingScreen /> : <SuggestionList />}
         */
