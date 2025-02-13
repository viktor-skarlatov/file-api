import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import filesReducer from './slices/filesSlice';
import commonReducer from './slices/commonSlice';
import { AppState } from "./types";
import { storeUtils } from "./utils";
import { authApi } from './api/authApi';
import { filesApi } from './api/filesApi';
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";

const persistConfig: PersistConfig<AppState> = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer<AppState>(
  persistConfig,
  combineReducers({
    auth: authReducer,
    files: filesReducer,
    common: commonReducer,
    [authApi.reducerPath]: authApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
  })
);

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([
      sagaMiddleware,
      authApi.middleware,
      filesApi.middleware,
    ])
});
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

storeUtils.appDispatch = store.dispatch;