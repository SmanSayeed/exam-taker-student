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

        getSingleModelTest: builder.query({
            query: (id) => `/model-tests/${id}`
        }),

        getExamsUnderMT: builder.query({
            query: (id) => `/model-test-exams/${id}`
        }),

        subscribeToPackage: builder.mutation({
            query: (data) => ({
                url: "/pay",
                method: "POST",
                body: data,
            }),
        }),

    }),
});

export const {
    useGetAllPackagesQuery,
    useGetSinglePackageQuery,
    useGetSingleModelTestQuery,
    useSubscribeToPackageMutation,
    useGetModelTestsByPkgIdQuery,
    useGetExamsUnderMTQuery,
} = packagesApi;