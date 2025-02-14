import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryFn } from "./common";

interface FilesResponse {
  files: string[];
}

export interface UploadFilePayload {
  url: string;
  file: File;
}

export interface DownloadRevisionPayload {
  url: string;
  revision?: string;
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
    download: builder.query<void, string>({
      query: (url) => ({
        url,
      })
    }),
    upload: builder.mutation<void, UploadFilePayload>({
      query: (payload) => {
        const formData = new FormData()
        formData.append('file', payload.file)
        return {
          url: `${payload.url}/${payload.file.name}/`,
          payload: formData,
          contentType: 'multipart/form-data',
          method: 'POST',
        }
      }
    }),
  })
});

export const {
  useGetFilesQuery,
  useLazyGetFilesQuery,
  useLazyDownloadQuery,
} = filesApi;
