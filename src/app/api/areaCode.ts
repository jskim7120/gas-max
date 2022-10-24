import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../axios";
import { RootState } from "../store";

export interface IJnSekum {
  code1: string;
  codeName: string;
  gubunName: string;
}

type IJnSekumResponse = IJnSekum[];

export const areaCodeApi = createApi({
  reducerPath: "areaCodeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (build) => ({
    getAreaCode: build.query<Array<any>, void>({
      query: () => `/app/EN1100/list/61`,
    }),
  }),
});

export const { useGetAreaCodeQuery } = areaCodeApi;
