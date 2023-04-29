import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";

export const PostsItem = ({ name, photo, place, location }) => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={require("../assets/img/photo-bg.jpg")}
    />

    <Text>{name}</Text>
    <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
      <TouchableOpacity
        style={styles.button}
        //   onPress={onPress}
      >
        <Octicons name="comment" size={24} color="#BDBDBD" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        //   onPress={onPress}
      >
        <Text>{place}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    height: 240,
  },
});
