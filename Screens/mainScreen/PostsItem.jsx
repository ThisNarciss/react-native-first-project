import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const PostsItem = ({ name, photo, place, location }) => {
  const navigation = useNavigation();

  const handleCommentBtn = () => {
    navigation.navigate("Comments", { photo });
  };

  const handleMapBtn = () => {
    navigation.navigate("Map", { location });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: photo }} />

      <Text style={styles.textName}>{name}</Text>
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
          <Octicons name="comment" size={20} color="#BDBDBD" />
          <Text
            style={{
              ...styles.textLoc,
              color: "#BDBDBD",
              textDecorationLine: "none",
            }}
          >
            0
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
