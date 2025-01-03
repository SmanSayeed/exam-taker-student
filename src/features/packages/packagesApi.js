import { persistor } from "@/app/store";
import { apiSlice } from "../api/apiSlice";
import { clearMTExamInfo } from "./mtExamSlice";
import { submittedMTExamInfo } from "./submittedMTExamSlice";

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

        startMTExam: builder.mutation({
            query: (data) => ({
                url: "model-test-exam-start",
                method: "POST",
                body: data,
            }),
        }),

        finishAllMTExam: builder.mutation({
            query: (data) => ({
                url: "/model-test-exam-finish",
                method: "POST",
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                try {
                    const result = await queryFulfilled;
                    const submittedMTExam = result.data;

                    dispatch(
                        clearMTExamInfo({
                            allMTExams: [],
                            activeExam: {}
                        })
                    );

                    localStorage.removeItem('selectedOptionalExam');
                    persistor.purge(['mtExam']);

                    dispatch(submittedMTExamInfo(submittedMTExam));
                } catch (err) {
                    console.log(err);
                }
            },
        }),

    }),
});

export const {
    useGetAllPackagesQuery,
    useGetSinglePackageQuery,
    useGetSingleModelTestQuery,
    useSubscribeToPackageMutation,
    useGetModelTestsByPkgIdQuery,
    useStartMTExamMutation,
    useGetExamsUnderMTQuery,
    useFinishAllMTExamMutation,
} = packagesApi;