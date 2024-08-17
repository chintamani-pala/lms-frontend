import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";

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
      }
    }),
  }),
});
