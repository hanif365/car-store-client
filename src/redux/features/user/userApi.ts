import { baseApi } from '@/redux/api/baseApi';

export const userApi = baseApi.injectEndpoints({
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
    getMyProfile: builder.query({
      query: () => ({
        url: '/users/my-profile',
        method: 'GET',
      }),
      providesTags: ['profile'],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/users/update-profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['profile', 'user'],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: '/users/change-password',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = userApi; 