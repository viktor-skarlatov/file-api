import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryFn } from "./common";

interface FilesResponse {
  files: string[];
}

export const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery: axiosBaseQueryFn,
  endpoints: builder => ({
    getFiles: builder.query<FilesResponse, void>({
      query: () => ({
        url: '/get-files',
      })
    }),
    download: builder.query<unknown, string>({
      query: (url) => ({
        url,
      })
    }),
  })
});

export const {
  useGetFilesQuery,
  useLazyGetFilesQuery,
  useLazyDownloadQuery,
} =  filesApi;