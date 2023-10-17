import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "app/axios";
import { RootState } from "../store";

export const footerApi = createApi({
  reducerPath: "footerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (build) => ({
    getFooterInfo: build.query<any, { areaCode: string; cuCode: string }>({
      query: (params) =>
        `/app/common/footDetail?areaCode=${params.areaCode}&sCuCode=${params.cuCode}`,
    }),
  }),
});

export const { useGetFooterInfoQuery } = footerApi;
