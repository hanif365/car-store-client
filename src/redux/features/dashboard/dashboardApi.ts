import { baseApi } from '@/redux/api/baseApi';

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: '/dashboard/stats',
        method: 'GET',
      }),
      providesTags: ['dashboard'],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;