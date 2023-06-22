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
    getAreaCodeDictionary: build.query<any, any>({
      query: ({ groupId, functionName, areaCode }) =>
        `/app/common/dictionary/${groupId}/${functionName}/${areaCode}`,
    }),

    getTabDictionary: build.query<any, any>({
      query: ({ groupId, functionName, tabId }) =>
        `/app/common/dictionary/${groupId}/${functionName}/tab/${tabId}`,
    }),

    getCommonDictionary: build.mutation({
      query: (body: { groupId: string; functionName: string }) => {
        return {
          url: `/app/common/dictionary/${body.groupId}/${body.functionName}`,
          method: "get",
        };
      },
    }),
  }),
});

export const {
  useGetCommonDictionaryMutation,
  useGetAreaCodeDictionaryQuery,
  useGetTabDictionaryQuery,
} = commonDictionaryApi;
