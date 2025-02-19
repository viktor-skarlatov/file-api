import fileSlice from "./filesSlice";

export const {
  getFilesAction,
  uploadFileAction,
  downloadFileAction,
  setFilesLoadingAction,
  setUploadDialogVisibleAction,
  setDownloadRevisionInfoAction,
} = fileSlice.actions
