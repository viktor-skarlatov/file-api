import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, AuthState } from "../types";
import { LoginFormFields } from "../../validation/loginFormSchema";
import { UserData } from "../../models/models";

export const initialState: AuthState = {
  isLoading: false,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (_, __: PayloadAction<LoginFormFields>) => {},
    logOutAction: (state) => {
      state.user = undefined
      state.authToken = undefined;
    },
    setUserAction: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload.user;
      state.authToken = action.payload.authToken;
    },
    setAuthLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
})

const selectAuthState = (state: AppState) => state.auth;

export const selectUser = createSelector(selectAuthState, (state) => state.user)
export const selectAuthLoading = createSelector(selectAuthState, (state) => state.isLoading)

export default authSlice
