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
import { useCallback, useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { db, storage } from "../../config";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { useAuth } from "../../hooks/useAuth";
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";

export const CreatePostScreen = () => {
  const { user, userId } = useAuth();
  const [comment, setComment] = useState("");
  const [place, setPlace] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [image, setImage] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [location, setLocation] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    if (image) {
      setPhoto(null);
    }
  }, [image]);

  const cameraRefCallback = useCallback((ref) => {
    setCameraRef(ref);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!isCameraOn && !image && !photo) {
        setIsCameraOn(true);
      }

      return () => {
        if (cameraRef) {
          setIsCameraOn(false);
        }
      };
    }, [cameraRef])
  );

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };
    getLocation();
  }, []);

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    };
    getPermissions();
  }, []);

  const writeDataToFirestore = async () => {
    try {
      const storagePhotoRef = await uploadPhotoToStorage();
      const docRef = await addDoc(collection(db, `posts`), {
        location,
        comment,
        place,
        photo: storagePhotoRef,
        name: user.name,
        userId,
      });
    } catch (e) {}
  };

  const pickImageFromGallery = async () => {
    if (image) {
      setImage(null);
      setPhoto(null);
      setIsCameraOn(true);
      return;
    }
    const { status } = await requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access media library was denied.");
      return;
    }

    const result = await launchImageLibraryAsync();

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setPhoto(null);
    }
  };

  const uploadPhotoToStorage = async () => {
    const response = await fetch(photo || image);
    const file = await response.blob();
    const postId = Date.now().toString();
    const storageRef = ref(storage, `images/${postId}`);
    await uploadBytes(storageRef, file);

    const processedPhoto = await getDownloadURL(
      ref(storage, `images/${postId}`)
    );
    return processedPhoto;
  };

  const handleBtnPublic = () => {
    writeDataToFirestore();
    navigation.navigate("DefaultScreen");
    setComment("");
    setPlace("");
    setPhoto(null);
    setImage(null);
    setIsCameraOn(true);
  };

  const handleDelBtn = () => {
    setComment("");
    setPlace("");
    setPhoto(null);
    setImage(null);
    setIsCameraOn(true);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };
  const nameHandler = (text) => setComment(text);
  const placeHandler = (text) => setPlace(text);

  const takePhoto = async () => {
    if (!isCameraOn) {
      setPhoto(null);
      setIsCameraOn(true);
      return;
    }
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
      setIsCameraOn(false);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View style={styles.container}>
          <View style={styles.cameraBox}>
            {isCameraOn && !image && (
              <Camera style={styles.camera} type={type} ref={cameraRefCallback}>
                {/* {(photo || image) && (
                  <View style={styles.photoBox}>
                    <Image
                      style={{ flex: 1 }}
                      source={{ uri: photo || image }}
                    />
                  </View>
                )} */}
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
              </Camera>
            )}
            {(photo || image) && (
              <View style={styles.camera}>
                <Image style={styles.image} source={{ uri: photo || image }} />
              </View>
            )}
            <TouchableOpacity
              onPress={takePhoto}
              style={{
                ...styles.cameraBtn,
                backgroundColor: `${
                  photo || image ? "rgba(255, 255, 255, 0.3)" : "#FFFFFF"
                }`,
              }}
            >
              <FontAwesome
                name="camera-retro"
                size={24}
                color={`${photo || image ? "#FFFFFF" : "#BDBDBD"}`}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.addPhoto}
            onPress={pickImageFromGallery}
          >
            <Text style={styles.addPhotoText}>
              {image ? "Видалити фото" : "Загрузити фото"}
            </Text>
          </TouchableOpacity>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextInput
              style={styles.input}
              value={comment}
              onChangeText={nameHandler}
              placeholder="Назва..."
              placeholderTextColor={"#BDBDBD"}
              textContentType="name"
              enterKeyHint="send"
            />
            <View style={styles.inputPlaceBox}>
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
              disabled={!(comment && place && (photo || image))}
              style={{
                ...styles.buttonBox,
                backgroundColor: `${
                  comment && place && (photo || image) ? "#FF6C00" : "#F6F6F6"
                }`,
              }}
              onPress={handleBtnPublic}
            >
              <Text
                style={{
                  ...styles.buttonText,
                  color: `${
                    comment && place && (photo || image) ? "#ffffff" : "#BDBDBD"
                  }`,
                }}
              >
                Опублікувати
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.delBtn} onPress={handleDelBtn}>
              <AntDesign name="delete" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    marginHorizontal: 16,
  },
  cameraBox: {
    height: 240,
    position: "relative",
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    overflow: "hidden",
  },
  photoBox: {
    // position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    zIndex: 2,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  camera: {
    position: "relative",
    flex: 1,
    width: "100%",
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
    position: "absolute",
    borderRadius: 30,
    padding: 18,

    zIndex: 9,
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
  inputPlaceBox: {
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
