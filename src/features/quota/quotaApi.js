import { apiSlice } from "../api/apiSlice";

export const quotaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    buyQuota: builder.mutation({
      query: (data) => ({
        url: "/exam-quota-subscriptions",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useBuyQuotaMutation } = quotaApi;
