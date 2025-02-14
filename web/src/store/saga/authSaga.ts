import { put, takeLatest } from "redux-saga/effects";
import { loginAction, setAuthLoadingAction, setUserAction } from "../slices/authSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginFormFields } from "../../validation/loginFormSchema";
import { appDispatch } from "../utils";
import { UserData } from "../../models/models";
import { authApi } from "../api/authApi";
import { invokeApi } from "./common";

function* handleLogin(action: PayloadAction<LoginFormFields>) {
  try {
    yield put(setAuthLoadingAction(true))
    yield appDispatch(authApi.util.resetApiState()) // We don't want cached values when logging in
    const data: UserData = yield invokeApi(authApi.endpoints.login, action.payload)
    yield put(setUserAction(data))
  } catch (err) {
    console.error(err)
  } finally {
    yield put(setAuthLoadingAction(false))
  }
}

export default function* authSaga() {
  yield takeLatest(loginAction.type, handleLogin)
}
