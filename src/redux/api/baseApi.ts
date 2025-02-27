/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    BaseQueryApi,
    BaseQueryFn,
    DefinitionType,
    FetchArgs,
    createApi,
    fetchBaseQuery,
  } from '@reduxjs/toolkit/query/react';
  import { RootState } from '../store';
  import { logout, setUser } from '../features/auth/authSlice';
  import { toast } from 'sonner';

  const baseUrl = import.meta.env.VITE_BASE_URL;
  
  const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      console.log(token);
  
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
  
      return headers;
    },
  });
  
  const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
  > = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);
  
    //need to remove this
    if (result?.error?.status === 404) {
      const message = (result.error.data as { message: string }).message;
      toast.error(message);
    }
    if (result?.error?.status === 403) {
      const message = (result.error.data as { message: string }).message;
      toast.error(message);
    }
    // 

    if (result?.error?.status === 401) {
      //* Send Refresh
      console.log('Sending refresh token');
  
      const res = await fetch(`${baseUrl}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
      });
  
      const data = await res.json();
  
      if (data?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;
  
        api.dispatch(
          setUser({
            user,
            token: data.data.accessToken,
          })
        );
  
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }
  
    return result;
  };
  
  export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ['user', 'products', 'orders', 'profile', 'dashboard'],
    endpoints: () => ({}),
  });
