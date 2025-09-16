import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const Apis = createApi({
  reducerPath: 'lease',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.citycarcenters.com/api/user',
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
    getAllLeases: builder.query({
      query: () => '/all/leases',
    }),
    getLeaseDetails: builder.query({
      query: (id)=> `/lease/details/${id}`
    }),
    createLease: builder.mutation({
      query: ({id, body})=>({
        url:`/create-lease/${id}`,
        method: 'POST',
        body
      })
    }),
    getPaymentDetails: builder.query({
      query: ()=> '/car/payment/history'
    })






  }),
});

export const { useGetAllLeasesQuery, useGetLeaseDetailsQuery, useCreateLeaseMutation, useGetPaymentDetailsQuery } = Apis;
