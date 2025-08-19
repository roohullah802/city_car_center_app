import { BASE_USER_URL } from '@env';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const Apis = createApi({
    reducerPath: "cars",
    baseQuery: fetchBaseQuery({baseUrl: BASE_USER_URL}),
    endpoints: (builder)=>({
        getCars: builder.query({
            query:()=> '/all/cars'
        }),
        getBrands: builder.query({
            query:()=> '/all/brands'
        }),
        getCarDetails: builder.query({
            query: (_id)=> `/car/details/${_id}`
        })
    })
     
})

export const {useGetCarsQuery, useGetBrandsQuery, useGetCarDetailsQuery} = Apis
