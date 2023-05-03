import "react-native-gesture-handler";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./Screens/Home";
import { MapScreen } from "./Screens/MapScreen";
import { CommentsScreen } from "./Screens/CommentsScreen";

const Stack = createStackNavigator();
const { Navigator, Screen } = Stack;

export default function App() {
  return (
    <NavigationContainer basename="/react-native-first-project">
      <Navigator>
        <Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Screen
          name="CommentsScreen"
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
          name="MapScreen"
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
    </NavigationContainer>
  );
}
