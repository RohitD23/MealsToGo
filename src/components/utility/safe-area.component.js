import React from "react";
import { StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components/native";

const Area = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  ${({ isAndroid }) => isAndroid && `margin-top: ${StatusBar.currentHeight}px`}
`;

export const SafeArea = ({ isAndroid, children }) => {
  return <Area isAndroid={isAndroid}>{children}</Area>;
};
