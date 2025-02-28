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
      query: (params) => ({
        url: "/orders",
        method: "GET",
        params: params,
      }),

      providesTags: ["orders"],
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
      invalidatesTags: ["orders"],
    }),
    getMyOrders: builder.query({
      query: (params) => ({
        url: "/orders/my-orders",
        method: "GET",
        params: params,
      }),
      providesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
  useUpdateOrderStatusMutation,
  useGetMyOrdersQuery,
} = orderApi;
