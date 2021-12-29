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

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const Tab = createBottomTabNavigator();

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  // TODO: isLogedIn wieder auf false setzen
  const [isLogedIn, setIsLogedIn] = useState(true);
  const [gotMessage, setGotMessage] = useState(true);

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

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
      isLogedIn,
      toggleLogin,
      gotMessage,
      toggleMessage,
    }),
    [
      toggleTheme,
      isThemeDark,
      isLogedIn,
      toggleLogin,
      gotMessage,
      toggleMessage,
    ]
  );

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
                } else if (route.name === "Freunde") {
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
            <Tab.Screen name="Startseite" component={MainScreen} />
            <Tab.Screen name="Neuigkeiten" component={NewsScreen} />
            <Tab.Screen name="Freunde" component={FriendsScreen} />
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
