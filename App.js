import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./Screens/Home";
import { MapScreen } from "./Screens/MapScreen";
import { CommentsScreen } from "./Screens/CommentsScreen";

const Stack = createNativeStackNavigator();
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
        <Screen name="CommentsScreen" component={CommentsScreen} />
        <Screen name="MapScreen" component={MapScreen} />
      </Navigator>
    </NavigationContainer>
  );
}
