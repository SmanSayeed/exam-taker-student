import { apiSlice } from "../api/apiSlice";

export const packagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPackages: builder.query({
            query: () => "/packages"
        }),
        getSinglePackages: builder.query({
            query: (id) => `/packages/${id}`
        }),
        subscribeToPackage: builder.mutation({
            query: ({id, data}) => ({
                url: `/packages/${id}/subscribe`,
                method: "POST",
                body: data,
              }),
        }),
    }),
});

export const {
    useGetAllPackagesQuery,
    useGetSinglePackagesQuery,
    useSubscribeToPackageMutation
} = packagesApi;