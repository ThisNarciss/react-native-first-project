import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
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
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "authorization/refreshUser",
  async (_, thunkAPI) => {
    try {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          console.log(user);
          if (user) {
            const userUpdateProfile = {
              user: { name: user.displayName, email: user.email },
              userId: user.uid,
            };
            resolve(userUpdateProfile);
          } else {
            reject("User is not authenticated");
          }
        });
      });
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
