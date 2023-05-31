import { View, Text } from "react-native";

import { Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { PostsItem } from "../mainScreen/PostsItem";
import { StyleSheet } from "react-native";

import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";

const Separator = () => <View style={styles.separator} />;

export const DefaultScreenPosts = () => {
  const { avatar, user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, `posts`), (snapshot) => {
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

  return (
    <View style={styles.backBox}>
      <View style={styles.container}>
        <View style={styles.userBox}>
          <Image style={styles.userPhoto} source={{ uri: avatar }} />
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
                id={item.id}
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
  backBox: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    marginHorizontal: 16,
  },
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
