import { BASE_USER_URL } from '@env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const Apis = createApi({
  reducerPath: 'lease',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_USER_URL }),
  endpoints: builder => ({
    getAllLeases: builder.query({
      query: () => '/all/leases',
    }),
  }),
});

export const {useGetAllLeasesQuery} = Apis;
