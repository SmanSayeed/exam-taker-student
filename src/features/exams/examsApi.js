import { persistor } from "@/app/store";
import { apiSlice } from "../api/apiSlice";
import { clearExamInfo, saveExamInfo } from "./examSlice";
import { submittedExamInfo } from "./submittedExamSlice";

export const examsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllExams: builder.query({
            query: () => "/exams/all/0"
        }),
        startExam: builder.mutation({
            query: (data) => ({
                url: "/exam/start",
                method: "POST",
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                try {
                    const result = await queryFulfilled;
                    const {exam, questions_list, mcqAnswers} = result.data;

                    dispatch(
                        saveExamInfo({
                            exam,
                            questions_list,
                            mcqAnswers
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
                    const {examination, student, mcq_answers, creative_answers, normal_answers, total_marks} = result.data;

                    dispatch(
                        clearExamInfo({
                            exam: {},
                            questions_list: [],
                            mcqAnswers: []
                        })
                    );

                    persistor.purge(['exam']);

                    dispatch(
                        submittedExamInfo({
                            examination,
                            student,
                            mcq_answers,
                            creative_answers,
                            normal_answers,
                            total_marks
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
    useGetAllExamsQuery,
    useStartExamMutation,
    useFinishExamMutation,
    useGetExamByIdQuery
} = examsApi;