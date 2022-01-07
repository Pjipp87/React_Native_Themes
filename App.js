import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainScreen } from "./src/Screens/MainScreen";
import { SettingsScreen } from "./src/Screens/SettingsScreen";
import { FriendsScreen } from "./src/Screens/FriendsScreen";
import { MessageScreen } from "./src/Screens/MessageScreen";
import { NewsScreen } from "./src/Screens/NewsScreen";
import { useState } from "react";
import React from "react";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import merge from "deepmerge";
import { PreferencesContext } from "./src/utils/ThemeContext";
import * as Icon from "@expo/vector-icons";
import ViewComponent from "./src/components/ViewComponent";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native-web";
import RegisterComponent from "./src/components/RegisterComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FriendSuggestionScreen } from "./src/Screens/FriendSuggestionScreen";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  // TODO: isLogedIn wieder auf false setzen
  const [isLogedIn, setIsLogedIn] = useState(true);
  const [gotMessage, setGotMessage] = useState(true);
  const [friendArray, setFriendArray] = useState([]);
  const [showInfoModal, setshowInfoModal] = useState(false);
  const [aktiveFriend, setAktiveFriend] = useState(null);
  const [userInformation, setsetuserInformation] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    picture: "../../mock/Image/ProfilePicture.png",
  });
  const [localData, setLocalData] = useState({});

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const toggleLogin = React.useCallback(() => {
    return setIsLogedIn(!isLogedIn);
  }, [isLogedIn]);

  const toggleMessage = React.useCallback(() => {
    return setGotMessage(!gotMessage);
  }, [gotMessage]);

  const addFriend = React.useCallback((item) => {
    return setFriendArray((friendArray) => [...friendArray, item]);

    //console.log("Vorher: ", friendArray);
  });

  const setUserinformationFunc = React.useCallback(
    (userObject) => {
      storeDataLocal(userObject);
      return setsetuserInformation(userObject);
    },
    [userInformation]
  );

  const setLocalDataFunc = React.useCallback(
    (Object) => {
      return setLocalData(Object);
    },
    [localData]
  );

  const removeFriend = React.useCallback((tempItem) => {
    const index = friendArray.findIndex(
      (index) => index.login.uuid === tempItem.login.uuid
    );
    let tempArray = friendArray;
    setFriendArray();
    tempArray.splice(index, 1);
    const newArray = tempArray;
    setFriendArray(tempArray);
    return setFriendArray((friendArray) => [...friendArray], newArray);
  });

  const toggleInfoModal = React.useCallback(() => {
    return setshowInfoModal(!showInfoModal);
  }, [showInfoModal]);

  const setAktiveFriendFunc = React.useCallback(
    (item) => {
      return setAktiveFriend(item);
    },
    [aktiveFriend]
  );

  //########################
  const storeDataLocal = async (userObject) => {
    try {
      const jsonValue = JSON.stringify(userObject);
      await AsyncStorage.setItem("User", jsonValue);
      console.log("saved");
    } catch (error) {
      console.log(error);
    }
  };
  //########################

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
      isLogedIn,
      toggleLogin,
      gotMessage,
      toggleMessage,
      friendArray,
      addFriend,
      removeFriend,
      showInfoModal,
      toggleInfoModal,
      aktiveFriend,
      setAktiveFriendFunc,
      userInformation,
      setUserinformationFunc,
      localData,
      setLocalDataFunc,
    }),
    [
      toggleTheme,
      isThemeDark,
      isLogedIn,
      toggleLogin,
      gotMessage,
      toggleMessage,
      friendArray,
      addFriend,
      removeFriend,
      showInfoModal,
      toggleInfoModal,
      aktiveFriend,
      setAktiveFriendFunc,
      userInformation,
      setUserinformationFunc,
      localData,
      setLocalDataFunc,
    ]
  );

  function Root() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Profil" component={MainScreen} />
        <Stack.Screen name="Registrierung" component={RegisterComponent} />
      </Stack.Navigator>
    );
  }

  function Friends() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Freunde" component={FriendsScreen} />
        <Stack.Screen name="Vorschläge" component={FriendSuggestionScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Startseite") {
                  //iconName = focused ? "home" : "home-outline";
                  iconName = "home";
                } else if (route.name === "Neuigkeiten") {
                  //iconName = focused ? "newspaper" : "newspaper-outline";
                  iconName = "newspaper";
                } else if (route.name === "Kontakte") {
                  //iconName = focused ? "newspaper" : "newspaper-outline";
                  iconName = "user-friends";
                } else if (route.name === "Nachrichten") {
                  //iconName = focused ? "newspaper" : "newspaper-outline";
                  iconName = "inbox";
                } else if (route.name === "Einstellungen") {
                  //iconName = focused ? "newspaper" : "newspaper-outline";
                  iconName = "bars";
                }

                // You can return any component that you like here!
                return (
                  <Icon.FontAwesome5
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen
              name="Startseite"
              options={{ headerShown: false }}
              component={Root}
            />
            <Tab.Screen name="Neuigkeiten" component={NewsScreen} />
            <Tab.Screen
              name="Kontakte"
              options={{ headerShown: false }}
              component={Friends}
            />
            <Tab.Screen
              name="Nachrichten"
              component={MessageScreen}
              options={gotMessage ? { tabBarBadge: 5 } : null}
            />
            <Tab.Screen name="Einstellungen" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
