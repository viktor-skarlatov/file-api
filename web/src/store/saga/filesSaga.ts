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

function* downloadFromUrl(url: string) {
  try {
    yield put(setFilesLoadingAction(true))
    const data: BlobPart = yield invokeApi(filesApi.endpoints.download, url)
    const blob = new Blob([data], { type: 'application/octet-stream' })
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const fileName = 'downloaded-doc.pdf';
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
