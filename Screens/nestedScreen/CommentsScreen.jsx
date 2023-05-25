import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import { db } from "../../config";
import { useSelector } from "react-redux";
import { selectAvatar, selectUser } from "../../redux/auth/selectors";

const month = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
];
const options = {
  timeZone: "Europe/Kiev",
  hour12: false,
  hour: "numeric",
  minute: "numeric",
};

const Item = ({ comment, avatar, commentDate }) => (
  <View style={styles.commentBox}>
    <View style={styles.item}>
      <Text style={styles.comment}>{comment}</Text>
      <Text style={styles.date}>{commentDate}</Text>
    </View>
    <Image style={styles.userPhoto} source={{ uri: avatar }} />
  </View>
);

const Separator = () => <View style={styles.separator} />;

export const CommentsScreen = () => {
  const user = useSelector(selectUser);
  const avatar = useSelector(selectAvatar);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const {
    params: { photo, postId },
  } = useRoute();

  useEffect(() => {
    const mainDocRef = doc(db, `posts`, postId);
    const subCollectionRef = collection(mainDocRef, "comments");
    const unsubscribe = onSnapshot(subCollectionRef, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setComments(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleInput = (text) => setComment(text);
  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const createComment = async () => {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat("default", options);
    const timeString = formatter.format(date);
    const commentDate = `${date.getDate().toString().padStart(2, "0")} ${
      month[date.getMonth()]
    }, ${date.getFullYear()} | ${timeString}`;

    const mainDocRef = doc(db, `posts`, postId);
    const subCollectionRef = collection(mainDocRef, "comments");
    await addDoc(subCollectionRef, {
      comment,
      nickName: user.name,
      avatar,
      commentDate,
    });
  };

  const onSendBtn = () => {
    createComment();
    setComment("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.bgBox}>
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: photo }} />
          {Boolean(comments.length) && (
            <FlatList
              data={comments}
              renderItem={({ item }) => (
                <Item
                  comment={item.comment}
                  avatar={item.avatar}
                  commentDate={item.commentDate}
                />
              )}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={Separator}
            />
          )}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <SafeAreaView>
              <TextInput
                style={styles.input}
                editable
                maxLength={200}
                onChangeText={handleInput}
                value={comment}
                placeholder="Коментувати..."
                placeholderTextColor={"#BDBDBD"}
              />
              <TouchableOpacity
                style={{
                  ...styles.sendBtn,
                  backgroundColor: Boolean(comment) ? "#FF6C00" : "#FFFFFF",
                }}
                onPress={onSendBtn}
              >
                <AntDesign
                  name="arrowup"
                  size={24}
                  color={`${Boolean(comment) ? "#FFFFFF" : "#212121"}`}
                />
              </TouchableOpacity>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  bgBox: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    justifyContent: "space-between",
  },
  image: {
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  userPhoto: {
    width: 28,
    height: 28,
    borderRadius: 16,
    backgroundColor: "#BDBDBD",
  },
  commentBox: { flexDirection: "row", gap: 16, justifyContent: "center" },
  input: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 100,
    borderStyle: "solid",
    padding: 16,
  },
  sendBtn: {
    position: "absolute",
    right: 8,
    top: 8,
    borderRadius: 50,
    padding: 10,
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

  separator: {
    height: 24,
  },
});
