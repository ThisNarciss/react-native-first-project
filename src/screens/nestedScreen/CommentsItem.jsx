import { StyleSheet, Image, Text, View } from "react-native";

export const CommentsItem = ({ comment, avatar, commentDate }) => (
  <View style={styles.commentBox}>
    <View style={styles.item}>
      <Text style={styles.comment}>{comment}</Text>
      <Text style={styles.date}>{commentDate}</Text>
    </View>
    <Image style={styles.userPhoto} source={{ uri: avatar }} />
  </View>
);

const styles = StyleSheet.create({
  commentBox: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
  },
  item: {
    flex: 1,
    padding: 16,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  comment: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121",
    marginBottom: 8,
  },
  date: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
  },
  userPhoto: {
    width: 28,
    height: 28,
    borderRadius: 16,
    backgroundColor: "#BDBDBD",
  },
});
