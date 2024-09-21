import { apiSlice } from "../api/apiSlice";
import { saveExamInfo } from "./examSlice";

export const examsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // getQuestions: builder.query({
        //     query: (page) => `que/all?page=${page}`,
        // }),
        startExam: builder.mutation({
            query: (data) => ({
                url: "/exam/start",
                method: "POST",
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                try {
                    const result = await queryFulfilled;
                    const {exam, questions_list} = result.data;

                    dispatch(
                        saveExamInfo({
                            exam: exam,
                            questions_list: questions_list
                        })
                    );
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        // deleteQuestion: builder.mutation({
        //     query: (id) => ({
        //         url: `que/delete/${id}`,
        //         method: "DELETE",
        //     }),
        // }),
    }),
});

export const {
    useStartExamMutation
} = examsApi;