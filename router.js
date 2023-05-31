import { Home } from "./src/screens/mainScreen/Home";
import { RegistrationScreen } from "./src/screens/authScreen/RegistrationScreen";
import { LoginScreen } from "./src/screens/authScreen/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { MapScreen } from "./src/screens/nestedScreen/MapScreen";
import { CommentsScreen } from "./src/screens/nestedScreen/CommentsScreen";
const Stack = createStackNavigator();
const { Navigator, Screen } = Stack;

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <Navigator initialRouteName="Login">
        <Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
      </Navigator>
    );
  }
  return (
    <Navigator initialRouteName="Home">
      <Screen name="Home" component={Home} options={{ headerShown: false }} />
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
