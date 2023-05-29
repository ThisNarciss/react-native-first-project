import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { SharedLayout } from "../SharedLayout";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/auth/operations";
import { useNavigation } from "@react-navigation/native";

import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
} from "expo-image-picker";

import { storage } from "../../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "../../hooks/useAuth";

export const RegistrationScreen = () => {
  const { error, isLoading, userId, user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShow, setIsPasswordShow] = useState(true);
  const [showBtnText, setShowBtnText] = useState("Показати");
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [width, setWidth] = useState(0);
  const [focusedInput, setFocusedInput] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) {
      return;
    }
    alert(`${error}`);
  }, [error]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsKeyboardShow(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboardShow(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const uploadPhotoToStorage = async (photo) => {
    const response = await fetch(photo);
    const file = await response.blob();
    const postId = Date.now().toString();
    const storageRef = ref(storage, `avatar/${postId}`);
    await uploadBytes(storageRef, file);

    const processedPhoto = await getDownloadURL(
      ref(storage, `avatar/${postId}`)
    );
    return processedPhoto;
  };

  const pickImageFromGallery = async () => {
    if (avatar) {
      setAvatar(null);
      return;
    }
    const { status } = await requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access media library was denied.");
      return;
    }

    const result = await launchImageLibraryAsync();

    if (!result.canceled) {
      const storageAvatarRef = await uploadPhotoToStorage(result.assets[0].uri);
      setAvatar(storageAvatarRef);
    }
  };

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
  };

  const onInputFocus = (id) => {
    setIsKeyboardShow(true);
    setFocusedInput(id);
  };
  const handleBlur = () => setFocusedInput(null);
  const nameHandler = (text) => setName(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);
  const keyboardHide = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
  };

  const showPasswordText = () => {
    if (!isPasswordShow) {
      setIsPasswordShow(true);
      setShowBtnText("Показати");
    }
    if (isPasswordShow) {
      setIsPasswordShow(false);
      setShowBtnText("Приховати");
    }
  };

  const onRegistration = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
    dispatch(registerUser({ name, email, password, avatar }));
    console.log(user);
    console.log(userId);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <SharedLayout>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View
          style={{
            ...styles.container,
            paddingBottom: isKeyboardShow ? 32 : 78,
          }}
        >
          <View
            onLayout={onLayout}
            style={{
              ...styles.photoBox,
              transform: [{ translateX: -0.5 * width }],
            }}
          >
            {avatar ? (
              <Image style={styles.image} source={{ uri: avatar }} />
            ) : (
              <View style={styles.image}></View>
            )}
            <TouchableOpacity
              onPress={pickImageFromGallery}
              style={{
                ...styles.icon,

                transform: avatar
                  ? [{ rotateZ: "45deg" }]
                  : [{ rotateZ: "0deg" }],
              }}
            >
              <AntDesign
                name="pluscircleo"
                size={25}
                color={avatar ? "#E8E8E8" : "#FF6C00"}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.text}>Реєстрація</Text>
          <KeyboardAvoidingView
            style={styles.form}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextInput
              style={{
                ...styles.input,
                marginTop: 33,
                ...(focusedInput === 1 && styles.inputFocused),
              }}
              value={name}
              onChangeText={nameHandler}
              onFocus={() => onInputFocus(1)}
              onBlur={handleBlur}
              placeholder="Логін"
              placeholderTextColor={"#BDBDBD"}
              textContentType="name"
              enterKeyHint="send"
            />
            <TextInput
              style={{
                ...styles.input,
                marginTop: 16,
                ...(focusedInput === 2 && styles.inputFocused),
              }}
              value={email}
              onChangeText={emailHandler}
              onFocus={() => onInputFocus(2)}
              onBlur={handleBlur}
              placeholder="Адреса електронної пошти"
              placeholderTextColor={"#BDBDBD"}
              textContentType="emailAddress"
              keyboardType="email-address"
              enterKeyHint="send"
            />
            <View style={{ ...styles.passwordInputBox, marginTop: 16 }}>
              <TextInput
                style={{
                  ...styles.input,
                  ...(focusedInput === 3 && styles.inputFocused),
                }}
                value={password}
                onChangeText={passwordHandler}
                onFocus={() => onInputFocus(3)}
                onBlur={handleBlur}
                placeholder="Пароль"
                secureTextEntry={isPasswordShow}
                placeholderTextColor={"#BDBDBD"}
                textContentType="password"
                enterKeyHint="send"
              />
              <TouchableOpacity
                style={styles.showPasswordBtn}
                onPress={showPasswordText}
              >
                <Text style={styles.showPasswordBtnText}>{showBtnText}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                ...styles.buttonBox,
                marginTop: 43,
                display: isKeyboardShow ? "none" : "flex",
              }}
              onPress={onRegistration}
            >
              {isLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text style={styles.buttonText}>Зареєструватися</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.redirectBtn,
                display: isKeyboardShow ? "none" : "flex",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.redirectBtnText}>
                Вже є обліковий запис? Увійти
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SharedLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,

    position: "relative",
  },
  photoBox: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: -60,
    left: "50%",
  },
  image: {
    position: "relative",

    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  icon: {
    position: "absolute",
    right: -12,
    top: 81,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  text: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    textAlign: "center",
    color: "#212121",
  },
  form: {
    marginHorizontal: 16,
  },

  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,

    padding: 16,
    paddingRight: 110,
    backgroundColor: "#F6F6F6",

    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
  },
  inputFocused: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FF6C00",
  },
  passwordInputBox: {
    position: "relative",
  },
  showPasswordBtn: {
    position: "absolute",
    right: 16,
    top: 17,
  },
  showPasswordBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,

    color: "#1B4371",
  },

  buttonBox: {
    paddingTop: 16,
    paddingBottom: 16,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#ffffff",
  },
  redirectBtn: {
    marginTop: 16,
  },
  redirectBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});
