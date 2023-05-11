import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreenPosts } from "../nestedScreen/DefaultScreenPosts";
import { CommentsScreen } from "../nestedScreen/CommentsScreen";
import { MapScreen } from "../nestedScreen/MapScreen";

const NestedScreen = createStackNavigator();
const { Navigator, Screen } = NestedScreen;

export const PostsScreen = () => {
  return (
    <Navigator>
      <Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{ headerShown: false }}
      />
      <Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerTitleAlign: "center",
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
          },
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "#E5E5E5",
          },
        }}
      />
      <Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Мапа",
          headerTitleAlign: "center",
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
          },
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "#E5E5E5",
          },
        }}
      />
    </Navigator>
  );
};

export default PostsScreen;
