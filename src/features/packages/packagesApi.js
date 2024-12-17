import { apiSlice } from "../api/apiSlice";

export const packagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPackages: builder.query({
            query: () => "/packages"
        }),
        getSinglePackage: builder.query({
            query: (id) => `/packages/${id}`
        }),
        getModelTestsByPkgId: builder.query({
            query: (id) => `/packages/${id}/model-tests`
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
    useGetSinglePackageQuery,
    useSubscribeToPackageMutation,
    useGetModelTestsByPkgIdQuery
} = packagesApi;