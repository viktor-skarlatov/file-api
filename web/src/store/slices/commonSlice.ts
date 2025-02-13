import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "../types";

const initialState: CommonState = {
  errors: [],
}
const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    appendErrorAction: (state, action: PayloadAction<string>) => {
      state.errors.push(action.payload);
    },
    clearErrorsAction: (state) => {
      state.errors = [];
    },
  },
})

export const {appendErrorAction, clearErrorsAction} = commonSlice.actions
export default commonSlice.reducer