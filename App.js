import "react-native-gesture-handler";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";
import { Main } from "./Screens/Main";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter/Inter-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Main />
      {/* </PersistGate> */}
    </Provider>
  );
}
