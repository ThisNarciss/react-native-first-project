import { View, Text } from "react-native";

import { Image } from "react-native";

export function PostsScreen() {
  return (
    <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <Text>PostsScreen</Text>
      <Image
        source={require("../assets/img/log-out.svg")}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}
