import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosResponseHeaders, ResponseType } from "axios";
import { appDispatch } from "../utils";
import { appendErrorAction } from "../slices/commonSlice";
import { AppState } from "../types";

export const BASE_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
});

export interface ApiResponse<T> {
  payload: T;
  headers: AxiosResponseHeaders;
  error?: string;
}

interface RequestInfo {
  url: string;
  method?: string;
  payload?: unknown;
  contentType?: string;
  responseType?: ResponseType;
}

function createHeaders(authToken?: string, contentType?: string) {
  const headers: Record<string, string> = {}
  headers['Accept'] = 'application/json';

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  if (authToken) {
    headers['Authorization'] = `Token ${authToken}`;
  }

  return headers;
}

const genericErrorMessage = "Something went wrong."

const errorTexts: Record<number, string> = {
  401: 'Unauthorized',
  404: 'Not found',
  500: genericErrorMessage,
}

function getErrorMessage(error: AxiosError) {
  if (!error.status) {
    return genericErrorMessage
  }

  return errorTexts[error.status] ?? error.message
}

export const axiosBaseQueryFn: BaseQueryFn<
  RequestInfo,
  unknown,
  string,
  unknown,
  object
> = async (
  { url, method = 'GET', payload, contentType, responseType },
  { getState }
) => {
  const state = getState() as AppState;
  try {
    const response = await axiosInstance.request({
      url,
      method,
      data: payload,
      headers: createHeaders(state.auth.authToken, contentType),
      responseType,
    });
  
    return {
      data: {
        headers: response.headers,
        payload: response.data,
      },
    }
  } catch (err) {
    const error = err as AxiosError;
    appDispatch(appendErrorAction(getErrorMessage(error)))
    return {
      error: error.message,
    }
  }
}