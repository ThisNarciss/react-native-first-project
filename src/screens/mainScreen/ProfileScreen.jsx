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
import { useDispatch } from "react-redux";
import { logoutUser, updateUserPhoto } from "../../redux/auth/operations";

import { PostsItem } from "./PostsItem";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "../../hooks/useAuth";

const Separator = () => <View style={styles.separator} />;

export const ProfileScreen = () => {
  const {
    userId,
    avatar,
    user: { name },
  } = useAuth();
  const [posts, setPosts] = useState([]);
  const [width, setWidth] = useState(0);
  const [newAvatar, setNewAvatar] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!newAvatar) {
      return;
    }
    dispatch(updateUserPhoto(newAvatar));
  }, [newAvatar]);

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
    const { status } = await requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access media library was denied.");
      return;
    }

    const result = await launchImageLibraryAsync();

    if (!result.canceled) {
      const storageAvatarRef = await uploadPhotoToStorage(result.assets[0].uri);
      setNewAvatar(storageAvatarRef);
    }
  };

  const onLogout = () => dispatch(logoutUser());

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
              {avatar ? (
                <Image style={styles.image} source={{ uri: avatar }} />
              ) : (
                <View style={styles.image}></View>
              )}
              <TouchableOpacity
                style={{
                  ...styles.icon,
                  transform: avatar
                    ? [{ rotateZ: "45deg" }]
                    : [{ rotateZ: "0deg" }],
                }}
                onPress={pickImageFromGallery}
              >
                <AntDesign
                  name="pluscircleo"
                  size={25}
                  color={avatar ? "#E8E8E8" : "#FF6C00"}
                />
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
