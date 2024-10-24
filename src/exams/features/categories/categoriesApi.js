import { apiSlice } from "../api/apiSlice";

export const categoriesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: (category) => `/category/${category}`,
        }),
        getCategoryById: builder.query({
            query: ({category, id}) => `/category/${category}/${id}`,
        }),
    }),
});

export const {
    useGetCategoryQuery,
    useGetCategoryByIdQuery
} = categoriesApi;