import { apiSlice } from "../api/apiSlice";

export const packagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPackages: builder.query({
            query: () => "/packages"
        }),
        getSinglePackages: builder.query({
            query: (id) => `/packages/${id}`
        }),
    }),
});

export const {
    useGetAllPackagesQuery,
     useGetSinglePackagesQuery
} = packagesApi;