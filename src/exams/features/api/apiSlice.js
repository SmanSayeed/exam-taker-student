import { persistor } from "@/app/store";
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

const baseQuery2 = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_BASE_URL_2,
    prepareHeaders: (headers, { getState }) => {
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
        console.log("result in basequery", result)

        if (result?.error?.status_code === 401) {
            toast.warning("your access token is expired!");

            api.dispatch(loggedOut({
                status: null,
                message: null,
                token: null,
                student: null,
            }));
            persistor.purge(['auth']);
        }
        return result;
    },
    tagTypes: ["Questions"],
    endpoints: (builder) => ({}),
});

export const apiSlice2 = createApi({
    reducerPath: "api2",
    baseQuery: async (args, api, extraOptions) => {
        let result = await baseQuery2(args, api, extraOptions);
        console.log("result in basequery 2", result)

        if (result?.error?.status_code === 401) {
            toast.warning("your access token is expired!");

            api.dispatch(loggedOut({
                status: null,
                message: null,
                token: null,
                student: null,
            }));
            persistor.purge(['auth']);
        }
        return result;
    },
    tagTypes: [],
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: (category) => `/questions/${category}`,
        }),
    }),
});

export const { useGetCategoryQuery } = apiSlice2;