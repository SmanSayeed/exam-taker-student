import { apiSlice } from "../api/apiSlice";
import { loggedIn, loggedOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    loggedIn: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          const { status, message, data } = result.data;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              status,
              message,
              token: data?.token,
              student: data?.student,
            })
          );

          dispatch(
            loggedIn({
              status,
              message,
              token: data?.token,
              student: data?.student,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    loggedOut: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),

      async onQueryStarted(arg, { dispatch }) {
        try {
          localStorage.clear();

          dispatch(
            loggedOut({
              status: null,
              message: null,
              token: null,
              student: null,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
    useLoggedInMutation,
  useLoggedOutMutation,
    useRegistrationMutation
} = authApi;