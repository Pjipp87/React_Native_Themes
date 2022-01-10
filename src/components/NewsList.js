import React from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  Image,
  View,
  Pressable,
} from "react-native";
import { Surface, List, Button, Title, Subheading } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";

export default function NewsList({ newsArray, tootlgeWebView }) {
  const { setAktiveNewsLinkFunc } = React.useContext(PreferencesContext);

  const _gotToWebsite = (url) => {
    setAktiveNewsLinkFunc(url);
    tootlgeWebView();
  };

  const windowWidth = Dimensions.get("window").width;
  return (
    <Surface
      style={{
        flex: 1,
        elevation: 5,
        width: windowWidth * 0.95,
        marginHorizontal: 5,
        marginTop: 15,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 15,
        }}
      >
        <Image
          source={{ uri: newsArray.urlToImage }}
          style={{
            width: windowWidth * 0.9,
            height: windowWidth * 0.9,
            borderColor: "black",
            borderRadius: 15,
          }}
        />
      </View>
      <Title style={{ textAlign: "center" }}>{newsArray.title}</Title>
      <List.Section>
        <List.Accordion title="Mehr anzeigen">
          <List.Item
            title={newsArray.description}
            description={
              <Button onPress={() => _gotToWebsite(newsArray.url)}>
                Zur Webseite
              </Button>
            }
            titleNumberOfLines={100}
            style={{ justifyContent: "center" }}
            descriptionStyle={{ paddingTop: 15 }}
          />
        </List.Accordion>
      </List.Section>
    </Surface>
  );
}

const styles = StyleSheet.create({});
