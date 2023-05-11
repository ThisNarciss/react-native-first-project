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

import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";

const Item = ({ comment }) => (
  <View style={styles.item}>
    <Text style={styles.comment}>{comment}</Text>
  </View>
);

const Separator = () => <View style={styles.separator} />;

export const CommentsScreen = () => {
  const [comments, setComments] = useState([]);
  const [id, setId] = useState(1);
  const [comment, setComment] = useState("");
  const {
    params: { photo },
  } = useRoute();

  useEffect(() => {
    setId((prevState) => prevState + 1);
  }, [comments]);

  const handleInput = (text) => setComment(text);
  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const onSendBtn = () => {
    setComments((prevState) => [...prevState, { comment, id }]);
    setComment("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.bgBox}>
        <View style={styles.container}>
          {/* <Text>Comments</Text> */}
          <Image style={styles.image} source={{ uri: photo }} />
          {Boolean(comments.length) && (
            <FlatList
              data={comments}
              renderItem={({ item }) => <Item comment={item.comment} />}
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
  commentBox: { position: "relative" },
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
  },

  separator: {
    height: 24,
  },
});
