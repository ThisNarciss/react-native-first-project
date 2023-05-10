import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { PostsItem } from "./PostsItem";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";

const Separator = () => <View style={styles.separator} />;

export function PostsScreen() {
  const user = useSelector(selectUser);
  console.log(user);
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState(1);
  const { params } = useRoute();

  useEffect(() => {
    if (params) {
      setPosts((prevState) => [...prevState, { ...params, id }]);
      setId((prevState) => prevState + 1);
    }
  }, [params]);
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
                name={item.name}
                photo={item.photo}
                place={item.place}
                location={item.coords}
              />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Separator}
          />
        )}
      </View>
    </View>
  );
}

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
