import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilesState } from "../types";

const initialState: FilesState = {
  userFilesMap: {},
  isLoading: false,
}
const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    getFiles: () => {},
    uploadFile: (_, __: PayloadAction<string>) => {},
    downloadFile: (_, __: PayloadAction<number>) => {},
  },
})

export const {getFiles, uploadFile, downloadFile} = fileSlice.actions
export default fileSlice.reducer