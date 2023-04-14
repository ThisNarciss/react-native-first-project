import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button } from "@rneui/themed";
import { SharedLayout } from "./SharedLayout";

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShow, setIsPasswordShow] = useState(true);
  const [showBtnText, setShowBtnText] = useState("Показати");
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

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

  const onLogin = () => {
    console.log(email, password);
    setIsKeyboardShow(false);
    Keyboard.dismiss();
    setEmail("");
    setPassword("");
  };

  return (
    <SharedLayout>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View
          style={{
            ...styles.container,
            paddingBottom: isKeyboardShow && Keyboard.isVisible ? 32 : 78,
          }}
        >
          <Text style={styles.text}>Вхід</Text>
          <KeyboardAvoidingView
            style={styles.form}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextInput
              style={{ ...styles.input, marginTop: 33 }}
              value={email}
              onChangeText={emailHandler}
              placeholder="Адреса електронної пошти"
              placeholderTextColor={"#BDBDBD"}
              textContentType="emailAddress"
              keyboardType="email-address"
              enterKeyHint="send"
            />
            <View style={{ ...styles.passwordInputBox, marginTop: 16 }}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={passwordHandler}
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
              onPress={onLogin}
            >
              <Text style={styles.buttonText}>Увійти</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.redirectBtn,
                display: isKeyboardShow ? "none" : "flex",
              }}
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.redirectBtnText}>
                Немає облікового запису? Зареєструватись
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SharedLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    // paddingBottom: 144,
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
