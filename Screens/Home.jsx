import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PostsScreen } from "./PostsScreen";

import { ProfileScreen } from "./ProfileScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";

const Stack = createNativeStackNavigator();
const { Navigator, Screen } = Stack;

export function Home() {
  return (
    <Navigator initialRouteName="PostsScreen">
      <Screen name="PostsScreen" component={PostsScreen} />
      <Screen name="CreatePostsScreen" component={CreatePostsScreen} />
      <Screen name="ProfileScreen" component={ProfileScreen} />
    </Navigator>
  );
}
