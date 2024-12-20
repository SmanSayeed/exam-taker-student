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
        startMTExam: builder.mutation({
            query: (data) => ({
                url: "model-test-exam-start",
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
    useGetModelTestsByPkgIdQuery,
    useStartMTExamMutation,
    useGetExamsUnderMTQuery
} = packagesApi;