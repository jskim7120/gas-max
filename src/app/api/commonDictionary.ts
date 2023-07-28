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
    getAreaCodeDictionary: build.mutation({
      query: (body: {
        groupId: string;
        functionName: string;
        areaCode: string;
      }) => {
        return {
          url: `/app/common/dictionary/${body.groupId}/${body.functionName}/tab/${body.areaCode}`,
          method: "get",
        };
      },
    }),

    getTabDictionary: build.mutation({
      query: (body: {
        groupId: string;
        functionName: string;
        tabId: number;
      }) => {
        return {
          url: `/app/common/dictionary/${body.groupId}/${body.functionName}/tab/${body.tabId}`,
          method: "get",
        };
      },
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
  useGetAreaCodeDictionaryMutation,
  useGetTabDictionaryMutation,
} = commonDictionaryApi;
