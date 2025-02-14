import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, CommonState } from "../types";

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

export const {
  appendErrorAction,
  clearErrorsAction
} = commonSlice.actions

const selectCommonState = (state: AppState) => state.common;
export const selectAppErrors = createSelector(selectCommonState, state => state.errors)

export default commonSlice.reducer