import React from "react";
import { Pressable, View, Modal } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import styled from "styled-components";
import { PreferencesContext } from "../utils/ThemeContext";
import { useTheme } from "react-native-paper";

const ModalView = styled(View)`
  flex: 1;
  background-color: green;
`;
const LoginView = styled(View)`
  flex: 0.7;
  justify-content: center;
  padding: 20px;
  background-color: blue;
`;

const Spacer = styled(View)`
  padding: 10px;
`;

export const LoginModal = () => {
  const { colors } = useTheme();
  const { toggleLogin } = React.useContext(PreferencesContext);
  return (
    <Modal>
      <ModalView style={{ backgroundColor: colors.background }}>
        <LoginView style={{ backgroundColor: colors.background }}>
          <TextInput mode="outlined" />
          <Spacer />
          <TextInput mode="outlined" />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 15,
            }}
          >
            <Pressable>
              <Text>Passwort vergessen</Text>
            </Pressable>
            <Button icon="location-enter" onPress={() => toggleLogin()}>
              Login
            </Button>
          </View>
        </LoginView>
      </ModalView>
    </Modal>
  );
};
