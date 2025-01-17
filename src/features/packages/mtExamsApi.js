import { apiSlice } from "../api/apiSlice";

export const mtExamsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadAnswerFile: builder.mutation({
            query: (data) => ({
                url: "/answer-files/upload",
                method: "POST",
                body: data,
            }),
        }),

        // getAnsweredFile: builder.query({
        //     query: ({data, id}) => ({
        //         url:   `/answer-files/${id}`,
        //         method: "GET",
        //         body: data,
        //     }),
        // }),

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
    useUploadAnswerFileMutation,
    useGetAnsweredFileQuery
} = mtExamsApi;