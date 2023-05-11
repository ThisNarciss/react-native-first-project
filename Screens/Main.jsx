import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshUser } from "../redux/auth/operations";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { useRoute } from "../router";

export const Main = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
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
