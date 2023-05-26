import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreenPosts } from "../nestedScreen/DefaultScreenPosts";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";

const NestedScreen = createStackNavigator();
const { Navigator, Screen } = NestedScreen;

export const PostsScreen = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <Navigator>
      <Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          title: "Публікації",
          headerTitleAlign: "center",
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
          },
          headerRightContainerStyle: { marginRight: 16 },
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "#E5E5E5",
          },

          headerRight: () => (
            <TouchableOpacity onPress={onLogout}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
    </Navigator>
  );
};

export default PostsScreen;
