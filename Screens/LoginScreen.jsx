import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { Button } from "@rneui/themed";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    console.table({ email, password });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.text}>Вхід</Text>
        <KeyboardAvoidingView
          style={styles.inputContainer}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            value={email}
            onChangeText={emailHandler}
            placeholder="Адреса електронної пошти"
            style={styles.input}
            placeholderTextColor={"#BDBDBD"}
            textContentType="emailAddress"
          />
          <TextInput
            value={password}
            onChangeText={passwordHandler}
            placeholder="Пароль"
            secureTextEntry={true}
            style={styles.input}
            placeholderTextColor={"#BDBDBD"}
            textContentType="password"
          />
          <Button
            title={"Увійти"}
            buttonStyle={styles.buttonBox}
            titleStyle={styles.buttonText}
            onPress={onLogin}
          />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 96,
    paddingBottom: 76,
    paddingLeft: 16,
    paddingRight: 16,
  },
  inputContainer: {
    display: "flex",
    gap: 16,
  },
  text: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",

    color: "#212121",
    marginBottom: 33,
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontSize: 16,
    lineHeight: 1.19,
    width: 343,

    padding: 10,
    backgroundColor: "#F6F6F6",

    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",

    padding: 16,
  },
  buttonBox: {
    width: 343,

    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 43,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#ffffff",
  },
});
