import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userRegister: builder.mutation({
            query: (data) => ({
                url: "/create",
                method: "POST",
                body: data,
            }),
        }),
        login: builder.mutation({
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
                            access_token: data?.token,
                            admin_user: data?.admin,
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            status,
                            message,
                            access_token: data?.token,
                            admin_user: data?.admin,
                        })
                    );
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST"
            }),

            async onQueryStarted(arg, { dispatch }) {

                try {
                    localStorage.clear();

                    dispatch(
                        userLoggedOut({
                            status: null,
                            message: null,
                            access_token: null,
                            admin_user: null,
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
    useLoginMutation,
    useLogoutMutation,
    useUserRegisterMutation
} = authApi;
