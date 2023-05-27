import { useSelector } from "react-redux";
import {
  selectAvatar,
  selectErrorAuth,
  selectIsLoading,
  selectIsLoggedIn,
  selectUser,
  selectUserId,
} from "../redux/auth/selectors";

export const useAuth = () => {
  const error = useSelector(selectErrorAuth);
  const userId = useSelector(selectUserId);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const avatar = useSelector(selectAvatar);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return { error, userId, user, isLoading, avatar, isLoggedIn };
};
