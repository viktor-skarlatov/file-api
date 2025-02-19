import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./slices/authSlice";
import filesReducer from './slices/filesSlice';
import commonReducer from './slices/commonSlice';
import { AppState } from "./types";
import { authApi } from './api/authApi';
import { filesApi } from './api/filesApi';
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";

export const createStore = (runSaga: boolean = true) => {
  const persistConfig: PersistConfig<AppState> = {
    key: "root",
    storage,
    whitelist: ["auth"],
  };
  
  const persistedReducer = persistReducer<AppState>(
    persistConfig,
    combineReducers({
      auth: authSlice.reducer,
      files: filesReducer.reducer,
      common: commonReducer,
      [authApi.reducerPath]: authApi.reducer,
      [filesApi.reducerPath]: filesApi.reducer,
    })
  );

  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
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
  const persistor = persistStore(store);

  if (runSaga) {
    sagaMiddleware.run(rootSaga);
  }

  return { store, persistor }
}
