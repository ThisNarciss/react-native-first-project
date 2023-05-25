import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../../config";

export const PostsItem = ({ comment, photo, place, location, id }) => {
  const [commentsQuantity, setCommentsQuantity] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const mainDocRef = doc(db, `posts`, id);
    const subCollectionRef = collection(mainDocRef, "comments");
    const unsubscribe = onSnapshot(subCollectionRef, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setCommentsQuantity(data.length);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleCommentBtn = () => {
    navigation.navigate("Comments", {
      photo,
      postId: id,
    });
  };

  const handleMapBtn = () => {
    navigation.navigate("Map", { location });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: photo }} />

      <Text style={styles.textName}>{comment}</Text>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            alignSelf: "flex-start",
            flexDirection: "row",
            alignItems: "center",

            gap: 8,
          }}
          onPress={handleCommentBtn}
        >
          <Octicons
            name="comment"
            size={20}
            color={commentsQuantity ? "#FF6C00" : "#BDBDBD"}
          />
          <Text
            style={{
              ...styles.textLoc,
              color: `${commentsQuantity ? "#212121" : "#BDBDBD"}`,
              textDecorationLine: "none",
            }}
          >
            {commentsQuantity}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            flexDirection: "row",
            gap: 8,
          }}
          onPress={handleMapBtn}
        >
          <Ionicons
            style={styles.icon}
            name="md-location-outline"
            size={20}
            color="#BDBDBD"
          />
          <Text style={styles.textLoc}>{place}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,

    height: 240,

    borderRadius: 8,
  },
  textName: {
    fontFamily: "Roboto-Medium",
    marginTop: 8,
    fontSize: 16,

    color: "#212121",
  },
  textLoc: {
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
    fontSize: 16,

    color: "#212121",
  },
});
