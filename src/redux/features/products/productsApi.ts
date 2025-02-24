import { baseApi } from '../../api/baseApi';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: 'products',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;