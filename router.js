import { Home } from "./Screens/mainScreen/Home";
import { RegistrationScreen } from "./Screens/authScreen/RegistrationScreen";
import { LoginScreen } from "./Screens/authScreen/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const { Navigator, Screen } = Stack;

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <Navigator initialRouteName="Login">
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
      </Navigator>
    );
  }
  return <Home />;
};
