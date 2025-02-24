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
      providesTags: ['orders'],
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: `/orders/verify-payment?order_id=${order_id}`,
        method: "GET",
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['orders'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
