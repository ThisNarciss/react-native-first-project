import { createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth, storage } from "../../config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// export const signUp =
//   ({ name, email, password }) =>
//   async (dispatch) => {
//     const user = await createUserWithEmailAndPassword(auth, email, password);
//     // console.log(user);
//     return user;
//   };

export const registerUser = createAsyncThunk(
  "authorization/registerUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      const updateUser = auth.currentUser;
      return {
        token: updateUser.accessToken,
        userId: updateUser.uid,
        user: { email: updateUser.email, name: updateUser.displayName },
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "authorization/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      return {
        token: user.user.accessToken,
        userId: user.user.uid,
        user: { email: user.user.email, name: user.user.displayName },
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "authorization/logoutUser",
  (_, thunkAPI) => {
    return logoutUserData()
      .then(clearAuthHeader())
      .catch((error) => thunkAPI.rejectWithValue(error.message));
  }
);

export const refreshUser = createAsyncThunk(
  "authorization/refreshUser",
  async (_, thunkAPI) => {
    try {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          const userUpdateProfile = {
            name: user.displayName,
            userId: user.uid,
          };
          return userUpdateProfile;
        }
      });
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
