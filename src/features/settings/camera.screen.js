import React, { useState, useEffect, useRef, useContext } from "react";
import { Camera } from "expo-camera";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../../services/authentication/authentication.context";

const NoCameraArea = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

const TakePhoto = styled(TouchableOpacity)`
  position: absolute;
  width: 70px;
  height: 70px;
  bottom: 20px;
  left: 40%;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const { user } = useContext(AuthenticationContext);
  const cameraRef = useRef();

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <NoCameraArea>
        <Text>No access to camera</Text>
      </NoCameraArea>
    );
  }

  return (
    <ProfileCamera
      ref={(camera) => (cameraRef.current = camera)}
      type={Camera.Constants.Type.front}
      ratio={"30:17"}
    >
      <TakePhoto onPress={snap} />
    </ProfileCamera>
  );
};
