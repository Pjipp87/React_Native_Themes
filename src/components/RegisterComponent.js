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
  const { setUserinformationFunc } = React.useContext(PreferencesContext);

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
    const userObject = {
      firstName,
      lastName,
      userName,
      image,
      password,
    };
    setUserinformationFunc(userObject);
    navigation.navigate("Profil");
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
        Neuer Benutzer
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
        <Button
          mode="contained"
          compact={true}
          onPress={pickImage}
          style={{ marginBottom: 30 }}
        >
          Pofilbild hochladen
        </Button>
        {image && (
          <Avatar.Image
            size={120}
            style={{ marginHorizontal: 30, marginBottom: 40 }}
            source={{ uri: image }}
          />
        )}
      </View>
      <View>
        <Text>Check:</Text>
        <Text>
          Name: {firstName} {lastName}
        </Text>

        <Text>Benutzername: {userName}</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          position: "relative",
          alignItems: "center",
          width: window.width,
          justifyContent: "space-around",
        }}
      >
        <Button
          mode="contained"
          compact={true}
          onPress={() => alert("Abbruch")}
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
