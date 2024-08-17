import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegistration } from "./authSlice";

type RegistrationResponce = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //end points here
    register: builder.mutation<RegistrationResponce, RegistrationData>({
      query: (data) => ({
        url: "/registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            userRegistration({
              token: data.activationToken,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "/activate-user",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
        credentials: "include" as const,
      }),
    }),
    login: builder.mutation({
      query: ({email,password}) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password
        },
        credentials: "include" as const,
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
    }),
  }),
});

export const { useRegisterMutation,useActivationMutation, useLoginMutation } = authApi;
