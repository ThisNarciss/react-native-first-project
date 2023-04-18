import { PostsScreen } from "./PostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { CreatePostScreen } from "./CreatePostScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const { Navigator, Screen } = Tab;
console.dir(Screen);
export function Home({ navigation }) {
  return (
    <Navigator
      initialRouteName="PostsScreen"
      screenOptions={{ tabBarShowLabel: false }}
    >
      <Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="ios-grid-outline" size={24} color="#212121" />
          ),
          headerTitleAlign: "center",
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <Screen
        name="CreatePostsScreen"
        component={CreatePostScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="plus-circle" size={40} color="#212121" />
          ),
          title: "Створити публікацію",

          headerTitleAlign: "center",
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
          },
        }}
      />
      <Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color="#212121" />
          ),
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
