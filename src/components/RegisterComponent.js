import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Avatar } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";
import * as ImagePicker from "expo-image-picker";

export default function RegisterComponent() {
  //######################
  const [image, setImage] = useState(null);

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

  return (
    <View>
      <Text>Register</Text>
      <Text>ImagePicker</Text>
      <View
        style={{ flex: 0 - 5, alignItems: "center", justifyContent: "center" }}
      >
        <Button mode="contained" compact={true} onPress={pickImage}>
          Pofilbild hochladen
        </Button>
        {image && (
          <Avatar.Image
            size={120}
            style={{ marginHorizontal: 30 }}
            source={{ uri: image }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
