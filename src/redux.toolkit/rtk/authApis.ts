import { BASE_AUTH_URL } from '@env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const Apis = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_AUTH_URL }),
  endpoints: builder => ({
    checkEmail: builder.mutation<{ success: boolean; message: string },{ email: string }>({
        query:({email})=>({
            url: '/forgot-password',
            method: 'POST',
            body: {email}
        })
    }),
    verifyEmail: builder.mutation({
      query:({email, code})=>({
        url: '/verify-email',
        method: 'POST',
        body: {email,code}
      })
    }),
    resendOtp: builder.mutation({
      query: ({email})=>({
        url: '/resend-otp',
        method: 'POST',
        body:{email}
      })
    }),
    resnedCode: builder.mutation({
      query: ({email})=>({
        url:'/resnd-code',
        method:"POST",
        body:{email}
      })
    }),
    matchOtp: builder.mutation({
      query: ({email, code})=>({
        url:'/match-otp',
        method:'POST',
        body:{email, code}
      })
    }),
    changePassword: builder.mutation({
      query: ({email, newPassword, reNewPassword})=>({
        url: '/reset-password',
        method: 'POST',
        body: {email, newPassword, reNewPassword}
      })
    }),
    changeAppPassword: builder.mutation({
      query: (data)=>({
        url: '/update/app/password',
        method:'POST',
        body: data
      })
    }),
    updateProfile: builder.mutation({
      query: (data)=>({
        url: '/update/profile',
        method: 'POST',
        body: data
      })
    })
    


  }),
});

export const { useCheckEmailMutation, useVerifyEmailMutation, useResendOtpMutation, useResnedCodeMutation, useMatchOtpMutation, useChangePasswordMutation, useChangeAppPasswordMutation, useUpdateProfileMutation } = Apis;
