import { Dispatch, UnknownAction } from "redux";

interface StoreUtils {
  appDispatch: Dispatch<UnknownAction>
}

export const storeUtils: StoreUtils = {
  appDispatch: undefined as unknown as Dispatch<UnknownAction>
}

export const appDispatch: Dispatch<UnknownAction> = (...args) => storeUtils.appDispatch(...args)