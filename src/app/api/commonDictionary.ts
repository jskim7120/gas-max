import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../axios";
import { RootState } from "../store";

export const commonDictionaryApi = createApi({
  reducerPath: "commonDictionaryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (build) => ({
    getCommonDictionary: build.query<any, any>({
      query: ({ groupId, functionName }) =>
        `/app/common/dictionary/${groupId}/${functionName}`,
    }),
  }),
});

export const { useGetCommonDictionaryQuery } = commonDictionaryApi;
