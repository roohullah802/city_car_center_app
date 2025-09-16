import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const Apis = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.citycarcenters.com/api/user/auth',
    prepareHeaders: async (headers, { getState }) => {
      const state = getState() as RootState;

      const token = state?.user?.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    // checkEmail: builder.mutation<{ success: boolean; message: string }, { email: string }>({
    //   query: ({ email }) => ({
    //     url: '/forgot-password',
    //     method: 'POST',
    //     body: { email },
    //   }),
    // }),
    // verifyEmail: builder.mutation({
    //   query: ({ email, code }) => ({
    //     url: '/verify-email',
    //     method: 'POST',
    //     body: { email, code },
    //   }),
    // }),
    // resendOtp: builder.mutation({
    //   query: ({ email }) => ({
    //     url: '/resend-otp',
    //     method: 'POST',
    //     body: { email },
    //   }),
    // }),
    // resnedCode: builder.mutation({
    //   query: ({ email }) => ({
    //     url: '/resnd-code',
    //     method: 'POST',
    //     body: { email },
    //   }),
    // }),
    // matchOtp: builder.mutation({
    //   query: ({ email, code }) => ({
    //     url: '/match-otp',
    //     method: 'POST',
    //     body: { email, code },
    //   }),
    // }),
    // changePassword: builder.mutation({
    //   query: ({ email, newPassword, reNewPassword }) => ({
    //     url: '/reset-password',
    //     method: 'POST',
    //     body: { email, newPassword, reNewPassword },
    //   }),
    // }),
    // changeAppPassword: builder.mutation({
    //   query: data => ({
    //     url: '/update/app/password',
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
    // updateProfile: builder.mutation({
    //   query: formData => ({
    //     url: '/update/profile',
    //     method: 'POST',
    //     body: formData,
    //   }),
    // }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
        body: {},
      }),
    }),
    validateToken: builder.mutation({
      query: token => ({
        url: '/validate',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    // login: builder.mutation({
    //   query: (body)=>({
    //     url: '/login',
    //     method: 'POST',
    //     body
    //   })
    // }),
    // signup: builder.mutation({
    //   query:(body)=>({
    //     url: '/signup',
    //     method:'POST',
    //     body
    //   })
    // })
  }),
});

export const { useLogoutMutation, useValidateTokenMutation } = Apis;
