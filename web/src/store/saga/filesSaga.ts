import { PayloadAction } from "@reduxjs/toolkit";
import { invokeApi } from "./common";
import { DownloadRevisionPayload, filesApi, UploadFilePayload } from "../api/filesApi";
import { put, takeLatest } from "redux-saga/effects";
import {
  downloadFileAction,
  setDownloadRevisionInfoAction,
  setFilesLoadingAction,
  setUploadDialogVisibleAction,
  uploadFileAction,
} from "../slices/filesSlice";
import { appDispatch } from "../utils";
import { ApiResponse } from "../api/common";

function* downloadFromUrl(url: string) {
  try {
    yield put(setFilesLoadingAction(true))
    const response: ApiResponse<Blob> = yield invokeApi(filesApi.endpoints.download, url)
    const link = document.createElement("a");
    link.href = URL.createObjectURL(response.payload);
    const fileName = url.substring(url.lastIndexOf('/') + 1);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    yield put(setDownloadRevisionInfoAction())
  } catch (err) {
    console.error(err)
  } finally { 
    yield put(setFilesLoadingAction(false))
  }
}

function* handleDownloadRevision(action: PayloadAction<DownloadRevisionPayload>) {
  let url = action.payload.url
  if (action.payload.revision !== undefined) {
    url = `${url}?revision=${action.payload.revision}`
  }

  yield downloadFromUrl(url)
}

function* handleUpload(action: PayloadAction<UploadFilePayload>) {
  try {
    yield put(setFilesLoadingAction(true))
    yield appDispatch(filesApi.util.resetApiState())
    yield invokeApi(filesApi.endpoints.upload, action.payload)
    yield put(setUploadDialogVisibleAction(false))
  } catch (err) {
    console.error(err)
  } finally { 
    yield put(setFilesLoadingAction(false))
  }
}

export default function* authSaga() {
  yield takeLatest(downloadFileAction.type, handleDownloadRevision)
  yield takeLatest(uploadFileAction.type, handleUpload)
}
