import React, { useState, useEffect, useMemo } from "react";
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

  const {
    isLogedIn,
    setProfilePictureFunc,
    setStatusFunc,
    setUserinformationFunc,
  } = React.useContext(PreferencesContext);
  const [visibleBanner, setVisibleBanner] = React.useState();
  const [currentUserData, setCurrentUserData] = useState({});
  const [statusModal, setStatusModal] = useState(false);
  const [statusMessage, setstatusMessage] = useState("");
  const [newStatusMessage, setnewStatusMessage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const window = useWindowDimensions();

  if (!isLogedIn) return <LoginModal />;

  const _getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("User");

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

  const _getUserImageFromLocal = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("Picture");

      const picture = JSON.parse(jsonValue);
      if (picture != null) {
        return setProfilePicture(picture);
      } else {
        return setCurrentUserData("../../mock/Image/ProfilePicture.png");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const _getStatusUpdate = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("Status");

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

  useMemo(() => _getUserData(), []);
  useMemo(() => _getStatusUpdate(), []);
  useMemo(() => _getUserImageFromLocal(), []);

  /**
     *   useEffect(() => {
    _getUserData();
    _getStatusUpdate();
    _getUserImageFromLocal();
    ;
  }, [!currentUserData, !statusMessage, !profilePicture]);
     */

  //###################

  const _showStatusModal = () => {
    setStatusModal(!statusModal);
  };

  const _setStatus = () => {
    setStatusFunc(newStatusMessage);
    setStatusModal(!statusModal);
    setnewStatusMessage("");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setProfilePictureFunc(result.uri);
    }
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
                  uri: profilePicture,
                }}
              />
              <Button
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
