import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Customer {
  areaCode: string;
  swCode: string;
  swName: string;
  swGubun: string;
  swJuminno: string;
  swTel: string;
  swAddr1: string;
  swAddr2: string;
  swZipcode: string;
  swCaCode: string;
  swCaName: string;
  swIndate: string;
  swPaytype: string;
  swPaykum: string;
  swPaytdate: string;
  driverType: string;
  swDriverNo: string;
  swJdate1: string;
  swJdate2: string;
  swBigo: string;
  swWorkOut: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://115.95.25.245:9999/",
  }),
  endpoints: (builder) => ({
    getCustomerList: builder.query<any[], void>({
      query: () => `employee/list`,
    }),
  }),
});

export const { useGetCustomerListQuery } = apiSlice;
