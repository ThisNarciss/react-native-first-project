import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export const registerUser = createAsyncThunk(
  "authorization/registerUser",
  async ({ name, email, password, avatar }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: avatar,
      });
      const updateUser = auth.currentUser;
      return {
        token: updateUser.accessToken,
        userId: updateUser.uid,
        avatar: updateUser.photoURL,
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
        avatar: user.user.photoURL,
        user: { email: user.user.email, name: user.user.displayName },
      };
    } catch (error) {
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
          if (user) {
            const userUpdateProfile = {
              user: { name: user.displayName, email: user.email },
              userId: user.uid,
              avatar: user.photoURL,
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

export const updateUserPhoto = createAsyncThunk(
  "authorization/updatePhoto",
  async (avatar, thunkAPI) => {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: avatar,
      });
      const updateUser = auth.currentUser;
      return {
        avatar: updateUser.photoURL,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
