import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.12:8000/" }), // Your API base URL
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "payments/intent",
        method: "POST",
        body: data, // This will be the cart total amount and any other needed data
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = apiSlice;
