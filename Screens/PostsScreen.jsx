import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { PostsItem } from "./PostsItem";

export function PostsScreen() {
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState(1);
  const { params } = useRoute();

  console.log(posts);

  useEffect(() => {
    if (params) {
      setPosts((prevState) => [...prevState, { ...params, id }]);
      setId((prevState) => prevState + 1);
    }
  }, [params]);
  return (
    <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <Text>PostsScreen</Text>
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
        />
      )}
      <Image
        source={require("../assets/img/log-out.svg")}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}
