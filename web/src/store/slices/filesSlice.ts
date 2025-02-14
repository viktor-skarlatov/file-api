import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, FileInfo, FilesState } from "../types";
import { DownloadRevisionPayload, UploadFilePayload } from "../api/filesApi";

const initialState: FilesState = {
  userFilesMap: {},
  isLoading: false,

  uploadDialogVisible: false,
}
const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    getFilesAction: () => {},
    uploadFileAction: (_, __: PayloadAction<UploadFilePayload>) => {},
    downloadFileAction: (_, __: PayloadAction<DownloadRevisionPayload>) => {},
    setFilesLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUploadDialogVisibleAction: (state, { payload }: PayloadAction<boolean>) => {
      state.uploadDialogVisible = payload
    },
    setDownloadRevisionInfoAction: (state, { payload }: PayloadAction<FileInfo | undefined>) => {
      state.downloadRevisionInfo = payload
    },
  },
})

export const {
  getFilesAction,
  uploadFileAction,
  downloadFileAction,
  setFilesLoadingAction,
  setUploadDialogVisibleAction,
  setDownloadRevisionInfoAction,
} = fileSlice.actions
export default fileSlice.reducer

const selectFilesState = (state: AppState) => state.files

export const selectUploadDialogVisible = createSelector(selectFilesState, state => state.uploadDialogVisible)
export const selectDownloadRevisionFileInfo = createSelector(selectFilesState, state => state.downloadRevisionInfo)