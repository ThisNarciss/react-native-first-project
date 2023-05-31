import { PostsScreen } from "./PostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { CreatePostScreen } from "./CreatePostScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { Feather, Ionicons, Entypo, AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const { Navigator, Screen } = Tab;

export const Home = () => {
  const navigation = useNavigation();

  return (
    <Navigator
      initialRouteName="PostsScreen"
      backBehavior="order"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 10,
          paddingHorizontal: 82,
          height: 70,
          borderTopColor: "#E5E5E5",
          borderTopWidth: 1,
        },
        tabBarItemStyle: { height: 40, borderRadius: 20 },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#212121",
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarInactiveBackgroundColor: "#FFFFFF",
      }}
    >
      <Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,
          title: "Публікації",
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="ios-grid-outline" size={24} color={color} />
          ),
          tabBarIconStyle: { opacity: 0.8 },
        }}
      />
      <Screen
        name="CreatePostsScreen"
        component={CreatePostScreen}
        options={() => ({
          title: "Створити публікацію",
          tabBarIcon: ({ focused, size, color }) => (
            <Entypo name="plus" size={18} color={color} />
          ),
          tabBarStyle: { display: "none" },

          headerTitleAlign: "center",
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
            color: "#212121",
          },
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "#E5E5E5",
          },
          headerLeftContainerStyle: { marginLeft: 16 },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("PostsScreen")}
            >
              <AntDesign name="arrowleft" size={24} color="#212121" />
            </TouchableOpacity>
          ),
        })}
      />
      <Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          headerShown: false,
          tabBarIconStyle: { opacity: 0.8 },
        }}
      />
    </Navigator>
  );
};
