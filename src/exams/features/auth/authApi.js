import { persistor } from "@/app/store";
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
          dispatch(
            loggedOut({
              status: null,
              message: null,
              token: null,
              student: null,
            })
          );
          persistor.purge(["auth"]);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ['Profile'], // Tag to identify this query
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/profile",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ['Profile'], // Invalidate profile query after update
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useUpdateProfileMutation,
  useGetProfileQuery,
  useLoggedInMutation,
  useLoggedOutMutation,
  useRegistrationMutation,
} = authApi;
