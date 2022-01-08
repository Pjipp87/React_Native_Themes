import React, { useState } from "react";
import {
  StyleSheet,
  View,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { Text, Button, Avatar, TextInput } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";
import * as ImagePicker from "expo-image-picker";

export default function RegisterComponent({ navigation }) {
  //######################
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const {
    setUserinformationFunc,
    userInformation,
    setProfilePictureFunc,
    pofilePicture,
  } = React.useContext(PreferencesContext);

  //------

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
      setImage(result.uri);
    }
  };
  //#######################
  const window = useWindowDimensions();

  const _setUser = () => {
    if (firstName && lastName && userName && password) {
      const userObject = {
        firstName,
        lastName,
        userName,
        password,
      };
      setUserinformationFunc(userObject);
      setProfilePictureFunc(image);
      console.log("#####################", pofilePicture);
      navigation.navigate("Profil");
    } else {
      alert("Bitte Daten eintragen!");
    }
  };

  return (
    <ScrollView style={{ flex: 1, height: window.height }}>
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          fontWeight: "bold",
          paddingVertical: 40,
        }}
      >
        Profil ändern
      </Text>
      <View style={{ paddingBottom: 20 }}>
        <TextInput
          label="Vorname"
          value={firstName}
          onChangeText={(firstname) => setFirstName(firstname)}
        />
        <TextInput
          label="Nachname"
          value={lastName}
          onChangeText={(lastName) => setlastName(lastName)}
        />

        <TextInput
          label="Benutzername"
          value={userName}
          onChangeText={(userName) => setUserName(userName)}
        />
        <TextInput
          label="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View
        style={{ flex: 0 - 5, alignItems: "center", justifyContent: "center" }}
      >
        <Avatar.Image
          size={120}
          style={{ marginHorizontal: 30, marginBottom: 40 }}
          source={{ uri: image }}
        />

        <Button
          mode="contained"
          compact={true}
          onPress={pickImage}
          style={{ marginBottom: 30 }}
        >
          Pofilbild hochladen
        </Button>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          width: window.width,
          justifyContent: "space-around",
        }}
      >
        <Button
          mode="contained"
          compact={true}
          onPress={() => navigation.navigate("Profil")}
        >
          Abbrechen
        </Button>
        <Button
          mode="contained"
          compact={true}
          onPress={() => _setUser(firstName, lastName, userName, password)}
        >
          Registrierung abschliessen
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
