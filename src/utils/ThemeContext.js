import React from "react";

export const PreferencesContext = React.createContext({
  toggleTheme: () => {},
  isThemeDark: false,
  isLogedIn: false,
  toggleLogin: () => {},
  gotMessage: true,
  toggleMessage: () => {},
  friendArray: [],
  addFriend: () => {},
  removeFriend: () => {},
  showInfoModal: false,
  toogleInfoModal: () => {},
  ativeFriend: null,
  setAktiveFriendFunc: () => {},
});
