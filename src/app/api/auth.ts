import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "app/axios";

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
  }),
});
export const { useLoginMutation } = authApi;
