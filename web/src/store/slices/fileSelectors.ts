import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "../types"

const selectFilesState = (state: AppState) => state.files

export const selectUploadDialogVisible = createSelector(selectFilesState, state => state.uploadDialogVisible)
export const selectDownloadRevisionFileInfo = createSelector(selectFilesState, state => state.downloadRevisionInfo)