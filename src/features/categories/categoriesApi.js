import { apiSlice } from "../api/apiSlice";

export const categoriesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: (category) => `/category/${category}`,
        }),
        getCategoryById: builder.query({
            query: ({category, id}) => {
                if(category === "tags") {
                    return `/tags/${id}`
                }
                
                return `/category/${category}/${id}`
            },
        }),
        getAllPkgCats: builder.query({
            query: () => "package-categories",
        }),
    }),
});

export const {
    useGetCategoryQuery,
    useGetCategoryByIdQuery,
    useGetAllPkgCatsQuery
} = categoriesApi;