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
    getAdditionalDictionary: build.query<any, any>({
      query: ({ groupId, functionName, areaCode }) =>
        `/app/common/dictionary/${groupId}/${functionName}/${areaCode}`,
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
  useGetAdditionalDictionaryQuery,
} = commonDictionaryApi;
