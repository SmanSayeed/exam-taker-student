import { apiSlice } from "../api/apiSlice";
import { saveQuestion } from "./questionSlice";

export const questionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuestions: builder.query({
            query: (page) => `que/all?page=${page}`,
        }),
        getSingleQuestions: builder.query({
            query: (id) => `/que/single/${id}`,
        }),
        createQuestion: builder.mutation({
            query: (data) => ({
                url: "/que/create",
                method: "POST",
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                try {
                    const result = await queryFulfilled;

                    dispatch(
                        saveQuestion({
                            question_id: result.data.data.id,
                            title: result.data.data.title,
                            description: result.data.data.description,
                            type: result.data.data.type,
                            mark: result.data.data.mark,
                            images: result.data.data.images,
                            is_paid: result.data.data.is_paid,
                            is_featured: result.data.data.is_featured,
                            status: result.data.data.status,
                            mcq_options: result.data.data.mcq_questions,
                        })
                    );
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        deleteQuestion: builder.mutation({
            query: (id) => ({
                url: `que/delete/${id}`,
                method: "DELETE",
            }),
        }),
        editQuestion: builder.mutation({
            query: ({ id, data }) => ({
                url: `que/update/${id}`,
                method: "PUT",
                body: data
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                try {
                    const result = await queryFulfilled;

                    dispatch(
                        saveQuestion({
                            question_id: result.data.data.id,
                            title: result.data.data.title,
                            description: result.data.data.description,
                            type: result.data.data.type,
                            mark: result.data.data.mark,
                            images: result.data.data.images,
                            is_paid: result.data.data.is_paid,
                            is_featured: result.data.data.is_featured,
                            status: result.data.data.status,
                            mcq_options: result.data.data.mcq_questions
                        })
                    );
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        questionSearch: builder.query({
            query: (data) => ({
                url: "/que/search",
                method: "GET",
                params: data
            })
        }),
    }),
});

export const {
    useCreateQuestionMutation,
    useGetQuestionsQuery,
    useDeleteQuestionMutation,
    useEditQuestionMutation,
    useQuestionSearchQuery,
    useGetSingleQuestionsQuery
} = questionsApi;