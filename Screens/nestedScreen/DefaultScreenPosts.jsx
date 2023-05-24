import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { PostsItem } from "../mainScreen/PostsItem";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectUser, selectUserId } from "../../redux/auth/selectors";
import { db } from "../../config";
import { collection, getDocs } from "firebase/firestore";

const Separator = () => <View style={styles.separator} />;

export const DefaultScreenPosts = () => {
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, `posts-${userId}`));

      querySnapshot.forEach((doc) => {
        setPosts((prevState) => [...prevState, { ...doc.data(), id: doc.id }]);
      });
    })();
  }, []);

  return (
    <View style={styles.backBox}>
      <View style={styles.container}>
        <View style={styles.userBox}>
          <Image style={styles.userPhoto} />
          <View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>
        {Boolean(posts.length) && (
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <PostsItem
                comment={item.comment}
                photo={item.photo}
                place={item.place}
                location={item.location}
              />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Separator}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backBox: { backgroundColor: "#ffffff", flex: 1 },
  container: { backgroundColor: "#ffffff", flex: 1, marginHorizontal: 16 },
  userBox: {
    marginTop: 32,
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#BDBDBD",
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
  separator: {
    height: 34,
  },
});
