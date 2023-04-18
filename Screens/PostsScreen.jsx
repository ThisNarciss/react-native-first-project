import { View, Text } from "react-native";
import { SharedLayout } from "./SharedLayout";
import { Image } from "react-native";

export function PostsScreen() {
  return (
    <SharedLayout>
      <View>
        <Text>PostsScreen</Text>
        <Image
          source={require("../assets/img/log-out.svg")}
          style={{ width: 100, height: 100 }}
        />
      </View>
    </SharedLayout>
  );
}
