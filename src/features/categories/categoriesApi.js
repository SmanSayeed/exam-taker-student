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
        getPkgCats: builder.query({
            query: () => "/package-categories",
        }),
        getAllPkgCats: builder.query({
            query: () => "/all-package-categories",
        }),
    }),
});

export const {
    useGetCategoryQuery,
    useGetCategoryByIdQuery,
    useGetPkgCatsQuery,
    useGetAllPkgCatsQuery
} = categoriesApi;