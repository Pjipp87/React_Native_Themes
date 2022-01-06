import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";
import { Button } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";
import * as ImagePicker from "expo-image-picker";

export const MessageScreen = () => {
  const { toggleMessage } = React.useContext(PreferencesContext);

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
    <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
      <Text>MessageScreen</Text>
      <Button mode="contained" compact={true} onPress={() => toggleMessage()}>
        Löschen
      </Button>
      <Text>ImagePicker</Text>
      <View
        style={{ flex: 0 - 5, alignItems: "center", justifyContent: "center" }}
      >
        <Button mode="contained" compact={true} onPress={pickImage}>
          Pick an image from camera roll
        </Button>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
