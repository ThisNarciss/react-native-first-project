import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SharedLayout } from "../SharedLayout";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";

export const ProfileScreen = () => {
  const [width, setWidth] = useState(0);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutUser());
  };

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
  };

  return (
    <SharedLayout>
      <View style={styles.container}>
        <View
          onLayout={onLayout}
          style={{
            ...styles.photoBox,
            transform: [{ translateX: -0.5 * width }],
          }}
        >
          <Image style={styles.image} />
          <TouchableOpacity style={styles.icon}>
            <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>Harry Potter</Text>

        <TouchableOpacity style={styles.logOutBtn} onPress={onLogout}>
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
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
  icon: { position: "absolute", right: -12, top: 81 },
  text: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    textAlign: "center",
    color: "#212121",
    marginBottom: 32,
  },

  logOutBtn: {
    position: "absolute",
    right: 16,
    top: 22,
  },
});
