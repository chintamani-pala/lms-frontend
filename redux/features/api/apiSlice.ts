import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
    endpoints: (builder) => ({
        refreshToken : builder.query({
            query: () => ({
                url: "refresh",
                method: "GET",
                credentials: "include" as const
            })
        }),
        loadUser : builder.query({
            query: () => ({
                url: "me",
                method: "GET",
                credentials: "include" as const
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                  const { data } = await queryFulfilled;
                  dispatch(
                    userLoggedIn({
                      accessToken: data.activationToken,
                      user: data.user
                    })
                  );
                } catch (err) {
                  console.log(err);
                }
              },
        })
    }),
})

export const {useRefreshTokenQuery, useLoadUserQuery} = apiSlice;