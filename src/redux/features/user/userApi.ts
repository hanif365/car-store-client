import { baseApi } from '@/redux/api/baseApi';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserMutation } = usersApi; 