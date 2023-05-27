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
import { createCommentDate } from "../../utils/createCommentDate";
import { CommentsItem } from "./CommentsItem";
import { useAuth } from "../../hooks/useAuth";
import { getSortedCommentList } from "../../utils/getSortedCommentsList";

const Separator = () => <View style={styles.separator} />;

export const CommentsScreen = () => {
  const { avatar, user } = useAuth();
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

  const createComment = async () => {
    const { commentDate, newDate } = createCommentDate();
    const mainDocRef = doc(db, `posts`, postId);
    const subCollectionRef = collection(mainDocRef, "comments");
    await addDoc(subCollectionRef, {
      comment,
      nickName: user.name,
      avatar,
      commentDate,
      createdAt: newDate,
    });
  };
  const handleInput = (text) => setComment(text);

  const onSendBtn = () => {
    createComment();
    setComment("");
  };

  const keyboardHide = () => Keyboard.dismiss();

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.bgBox}>
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: photo }} />
          {Boolean(comments.length) && (
            <FlatList
              data={getSortedCommentList(comments)}
              renderItem={({ item }) => (
                <CommentsItem
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

  separator: {
    height: 24,
  },
});
