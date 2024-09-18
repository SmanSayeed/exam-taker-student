import { apiSlice } from "../api/apiSlice";

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

            // async onQueryStarted(arg, { queryFulfilled, dispatch }) {

            //     try {
            //         const result = await queryFulfilled;

            //         dispatch(
            //             saveQuestion({
            //                 question_id: result.data.data.id,
            //                 title: result.data.data.title,
            //                 description: result.data.data.description,
            //                 type: result.data.data.type,
            //                 mark: result.data.data.mark,
            //                 images: result.data.data.images,
            //                 is_paid: result.data.data.is_paid,
            //                 is_featured: result.data.data.is_featured,
            //                 status: result.data.data.status,
            //                 mcq_options: result.data.data.mcq_questions,
            //             })
            //         );
            //     } catch (err) {
            //         console.log(err);
            //     }
            // },
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