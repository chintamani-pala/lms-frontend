import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
require("dotenv").config()




export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
    endpoints: (builder) => ({}),
})

export const {} = apiSlice;