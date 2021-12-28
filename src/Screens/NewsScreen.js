import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components";

const Textfield = styled(Text)`
  color: blue;
`;

export const NewsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Textfield>NewsScreen</Textfield>
    </View>
  );
};

const styles = StyleSheet.create({});
