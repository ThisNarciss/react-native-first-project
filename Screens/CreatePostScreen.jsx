import { Camera } from "expo-camera";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { Image } from "react-native";

export function CreatePostScreen() {
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    await MediaLibrary.createAssetAsync(uri);
    setPhoto(uri);
    console.log(photo);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCameraRef}>
        <View>
          <Image source={photo} />
        </View>
        <TouchableOpacity onPress={takePhoto} style={styles.cameraBtn}>
          <FontAwesome name="camera-retro" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  camera: {
    height: 240,
    marginHorizontal: 16,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },
  cameraBtn: {
    borderRadius: 30,
    padding: 18,
    backgroundColor: "#ffffff",
  },
});
