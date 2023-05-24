import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "app/axios";
import { RootState } from "../store";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { username: string; password: string }) => {
        return {
          url: "auth/login",
          method: "post",
          body,
        };
      },
    }),

    reLogin: builder.mutation({
      query: (body: {
        username: string;
        password: string;
        hpSeq: string;
        areaCode: string;
      }) => {
        return {
          url: "auth/reLogin",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const reLoginApi = createApi({
  reducerPath: "reLoginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    loginInfo: builder.mutation({
      query: (body: { username: string }) => {
        return {
          url: "auth/loginInfo",
          method: "post",
          body,
        };
      },
    }),
    areaInfo: builder.mutation({
      query: (body: { username: string; hpSeq: string }) => {
        return {
          url: `/app/common/areaName?hpSno=${body.username}&hpSeq=${body.hpSeq}`,
          method: "get",
        };
      },
    }),

    areaName: builder.mutation({
      query: (body: { areaCode: string }) => {
        return {
          url: `/app/EN1100/OPT65?areaCode=${body.areaCode}`,
          method: "get",
        };
      },
    }),
  }),
});

export const { useLoginMutation, useReLoginMutation } = authApi;
export const {
  useAreaInfoMutation,
  useLoginInfoMutation,
  useAreaNameMutation,
} = reLoginApi;
