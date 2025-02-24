import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: `/orders/verify-payment/${order_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
} = orderApi;
