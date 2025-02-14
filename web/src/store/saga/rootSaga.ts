import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import filesSaga from "./filesSaga";

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(filesSaga),
  ]);
}
