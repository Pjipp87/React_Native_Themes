import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Dimensions } from "react-native";
import { Loading } from "../components/Loading";
import NewsList from "../components/NewsList";
import axios from "axios";
import { WebView } from "react-native-webview";
import { Button } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";

export const NewsScreen = () => {
  const [isLoading, setisLoading] = useState(true);
  const [newsArray, setNewsArray] = useState([]);
  const [showWeb, setShowWeb] = useState();
  const { aktiveNewsLink, setAktiveNewsLinkFunc } =
    React.useContext(PreferencesContext);

  const windowWidth = Dimensions.get("window").width;
  const windowheight = Dimensions.get("window").height;

  const _getApiResponse = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=de&apiKey=ee18b01700ad424983d63d90edf6d872"
      );
      console.log("new", response.data.articles[1].author);
      setNewsArray(response.data.articles);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    _getApiResponse();
  }, []);

  const _refreshNewsArray = () => {
    setisLoading(true);
    _getApiResponse();
  };

  const _toggleWebView = () => {
    if (showWeb) {
      setAktiveNewsLinkFunc("");
    }
    setShowWeb(!showWeb);
  };

  if (showWeb) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WebView
          source={{ uri: aktiveNewsLink }}
          style={{
            marginTop: 20,
            flex: 1,
            width: windowWidth,
            height: windowheight,
          }}
        />
        <Button onPress={() => _toggleWebView()}>Schliessen</Button>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={newsArray}
            renderItem={({ item }) => (
              <NewsList
                newsArray={item}
                tootlgeWebView={() => _toggleWebView()}
              />
            )}
            keyExtractor={(item) => item.url}
            refreshing={isLoading}
            onRefresh={() => _refreshNewsArray()}
          ></FlatList>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
