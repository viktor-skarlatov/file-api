import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginFormFields } from "../../validation/loginFormSchema";
import { UserData } from "../../models/models";
import { axiosBaseQueryFn } from "./common";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQueryFn,
  endpoints: builder => ({
    login: builder.query<UserData, LoginFormFields>({
      query: (payload) => ({
        url: '/login/',
        method: 'POST',
        payload,
      })
    }),
  })
});

export const {
  useLoginQuery,
  useLazyLoginQuery,
} = authApi;
