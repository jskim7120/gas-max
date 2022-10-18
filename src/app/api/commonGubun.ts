import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../axios";
import { RootState } from "../store";

export interface IJnSekum {
  code1: string;
  codeName: string;
  gubunName: string;
}

type IJnSekumResponse = IJnSekum[];

export const commonGubunApi = createApi({
  reducerPath: "commonGubunApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (build) => ({
    getCommonGubun: build.query<IJnSekumResponse, string>({
      query: (bacode) => `/app/common/gubun/${bacode}`,
    }),
  }),
});

export const { useGetCommonGubunQuery } = commonGubunApi;
