import { NavigationContainer } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshUser } from "../redux/auth/operations";
import { useRoute } from "../../router";
import { useAuth } from "../hooks/useAuth";

export const Main = () => {
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const routing = useRoute(isLoggedIn);
  return (
    <NavigationContainer basename="/react-native-first-project">
      {routing}
    </NavigationContainer>
  );
};
