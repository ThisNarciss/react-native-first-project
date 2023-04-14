import { StyleSheet, View, ImageBackground } from "react-native";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { RegistrationScreen } from "./RegistrationScreen";

SplashScreen.preventAutoHideAsync();

export function SharedLayout({ children }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter/Inter-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/img/photo-bg.jpg")}
      >
        {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "scroll",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    justifyContent: "flex-end",
  },
});
