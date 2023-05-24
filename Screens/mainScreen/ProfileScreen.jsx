import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";

import { AntDesign, Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import { selectUser, selectUserId } from "../../redux/auth/selectors";
import { PostsItem } from "./PostsItem";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../config";

const Separator = () => <View style={styles.separator} />;

export const ProfileScreen = () => {
  const { name } = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const [posts, setPosts] = useState([]);
  const [width, setWidth] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setPosts(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onLogout = () => {
    dispatch(logoutUser());
  };

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
  };

  return (
    <View style={styles.bg}>
      <ImageBackground
        style={styles.imageBg}
        source={require("../../assets/img/photo-bg.jpg")}
      >
        <View style={styles.container}>
          <View style={styles.board}>
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

            <Text style={styles.text}>{name}</Text>

            <TouchableOpacity style={styles.logOutBtn} onPress={onLogout}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>

            {Boolean(posts.length) && (
              <FlatList
                data={posts}
                renderItem={({ item }) => (
                  <PostsItem
                    comment={item.comment}
                    photo={item.photo}
                    place={item.place}
                    location={item.location}
                    id={item.id}
                  />
                )}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={Separator}
              />
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  board: { marginHorizontal: 16, flex: 1 },

  container: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    flex: 0.8,
    position: "relative",
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  photoBox: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: -150,
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
    right: 0,
    top: -70,
  },
  separator: {
    height: 34,
  },
});
