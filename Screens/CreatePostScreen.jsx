import { Camera } from "expo-camera";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export function CreatePostScreen() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBtnPublic = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
      navigation.navigate("PostsScreen", { coords, name, place, photo });
    })();
    setName("");
    setPlace("");
    setPhoto(null);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };
  const nameHandler = (text) => setName(text);
  const placeHandler = (text) => setPlace(text);

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View style={styles.container}>
          <View style={styles.cameraBox}>
            <Camera style={styles.camera} type={type} ref={setCameraRef}>
              <View>
                <Image source={photo} />
              </View>
              <TouchableOpacity
                style={styles.cameraReverse}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Ionicons
                  name="camera-reverse-outline"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takePhoto}
                style={{
                  ...styles.cameraBtn,
                  backgroundColor: `${
                    photo ? "rgba(255, 255, 255, 0.3)" : "#FFFFFF"
                  }`,
                }}
              >
                <FontAwesome
                  name="camera-retro"
                  size={24}
                  color={`${photo ? "#FFFFFF" : "#BDBDBD"}`}
                />
              </TouchableOpacity>
            </Camera>
          </View>
          <TouchableOpacity style={styles.addPhoto}>
            <Text style={styles.addPhotoText}>Загрузити фото</Text>
          </TouchableOpacity>
          <KeyboardAvoidingView
            // style={styles.form}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={nameHandler}
              placeholder="Назва..."
              placeholderTextColor={"#BDBDBD"}
              textContentType="name"
              enterKeyHint="send"
            />
            <View style={styles.inputplaceBox}>
              <TextInput
                style={{ ...styles.input, paddingLeft: 24 }}
                value={place}
                onChangeText={placeHandler}
                placeholder="Місцевість..."
                placeholderTextColor={"#BDBDBD"}
                textContentType="name"
                enterKeyHint="send"
              />
              <Ionicons
                style={styles.icon}
                name="md-location-outline"
                size={24}
                color="#BDBDBD"
              />
            </View>
            <TouchableOpacity
              style={{
                ...styles.buttonBox,
                backgroundColor: `${
                  name && place && photo ? "#FF6C00" : "#F6F6F6"
                }`,
              }}
              onPress={handleBtnPublic}
            >
              <Text
                style={{
                  ...styles.buttonText,
                  color: `${name && place && photo ? "#ffffff" : "#BDBDBD"}`,
                }}
              >
                Опублікувати
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.delBtn}
              // onPress={onRegistration}
            >
              <AntDesign name="delete" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    marginHorizontal: 16,
  },
  cameraBox: {
    height: 240,

    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    position: "relative",
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraReverse: {
    position: "absolute",
    top: 10,
    right: 10,
    flex: 0.2,
  },
  cameraBtn: {
    borderRadius: 30,
    padding: 18,
  },
  addPhoto: {
    marginTop: 8,
    width: 117,
  },
  addPhotoText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    marginTop: 32,

    fontFamily: "Roboto-Regular",
    fontSize: 16,

    paddingBottom: 15,
    color: "#212121",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  inputplaceBox: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    bottom: 16,
    left: 0,
  },
  buttonBox: {
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 32,

    borderRadius: 100,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
  },
  delBtn: {
    paddingLeft: 23,
    paddingRight: 23,
    paddingBottom: 8,
    paddingTop: 8,
    width: 70,
    marginTop: 120,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});
