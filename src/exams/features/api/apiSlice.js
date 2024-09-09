import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { loggedOut } from "./../auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
        const token = getState()?.auth?.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);
        if (result?.error?.status === 401) {
            toast.warning("your access token is expired!");
            api.dispatch(loggedOut());
            localStorage.clear();
        }
        return result;
    },
    // tagTypes: ["Questions"],
    endpoints: (builder) => ({}),
});