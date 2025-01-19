import { persistor } from "@/app/store";
import { apiSlice } from "../api/apiSlice";
import { clearMTExamInfo } from "./mtExamSlice";
import { submittedMTExamInfo } from "./submittedMTExamSlice";

export const mtExamsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
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

        getAllStuResult: builder.query({
            query: (modelTestId) => `/model-test-all-students-exam-result/${modelTestId}`
        }),

        getSingleStuResult: builder.query({
            query: ({modelTestId, studentId}) => `/model-test-exam-result-with-merit/${modelTestId}/${studentId}`
        }),

        uploadAnswerFile: builder.mutation({
            query: (data) => ({
                url: "/answer-files/upload",
                method: "POST",
                body: data,
            }),
        }),

        getAnsweredFile: builder.query({
            query: ({ id, params }) => {
                const queryString = params
                    ? '?' + new URLSearchParams(params).toString()
                    : '';
                return {
                    url: `/answer-files/${id}${queryString}`,
                    method: "GET",
                };
            },
        }),
    }),
});

export const {
    useStartMTExamMutation,
    useFinishAllMTExamMutation,
    useGetAllStuResultQuery,
    useGetSingleStuResultQuery,
    useUploadAnswerFileMutation,
    useGetAnsweredFileQuery
} = mtExamsApi;