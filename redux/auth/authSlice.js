import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
  updateUserPhoto,
} from "./operations";

const initialState = {
  user: { name: null, email: null },
  userId: null,
  avatar: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,
  errorAuth: null,
};

const authSlice = createSlice({
  name: "authorization",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.isLoading = false;
        state.token = payload.token;
        state.user = payload.user;
        state.userId = payload.userId;
        state.avatar = payload.avatar;
        state.errorAuth = null;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorAuth = payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.isLoading = false;
        state.token = payload.token;
        state.user = payload.user;
        state.userId = payload.userId;
        state.avatar = payload.avatar;
        state.errorAuth = null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorAuth = payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = { name: null, email: null };
        state.userId = null;
        state.avatar = null;
        state.errorAuth = null;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.userId = payload.userId;
        state.avatar = payload.avatar;
        state.isLoggedIn = true;
      })
      .addCase(updateUserPhoto.fulfilled, (state, { payload }) => {
        state.avatar = payload.avatar;
      });
  },
});

export const authReducer = authSlice.reducer;
