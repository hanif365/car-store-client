import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ['user'],
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `/users/update-profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
  useUpdateUserProfileMutation,
} = userApi; 