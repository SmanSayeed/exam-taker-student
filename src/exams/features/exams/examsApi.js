import { apiSlice } from "../api/apiSlice";
import { clearExamInfo, saveExamInfo } from "./examSlice";
import { submittedExamInfo } from "./submittedExamSlice";

export const examsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        startExam: builder.mutation({
            query: (data) => ({
                url: "/exam/start",
                method: "POST",
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                try {
                    const result = await queryFulfilled;
                    const {exam, questions_list, mcqAnswers, timeLeft} = result.data;

                    dispatch(
                        saveExamInfo({
                            exam,
                            questions_list,
                            mcqAnswers,
                            timeLeft
                        })
                    );
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        finishExam: builder.mutation({
            query: (data) => ({
                url: "/exam/finish",
                method: "POST",
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                try {
                    const result = await queryFulfilled;
                    const {examination, student, mcq_answers, creative_answers, normal_answers} = result.data;

                    dispatch(
                        clearExamInfo({
                            exam: {},
                            questions_list: [],
                            mcqAnswers: [],
                            timeLeft: null
                        })
                    );

                    dispatch(
                        submittedExamInfo({
                            examination,
                            student,
                            mcq_answers,
                            creative_answers,
                            normal_answers
                        })
                    )
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        getExamById: builder.query({
            query: (id) => `/exam-details/${id}`
        })
    }),
});

export const {
    useStartExamMutation,
    useFinishExamMutation,
    useGetExamByIdQuery
} = examsApi;