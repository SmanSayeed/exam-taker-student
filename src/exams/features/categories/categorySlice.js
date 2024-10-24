import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    categories: {},
    isLoading: false,
    error: null,
}

export const fetchCategoryData = createAsyncThunk(
    "category/fetchCategoryData",
    async (category, { getState }) => {
         const baseURL = "https://loopsexam.xyz/api/v1/admin";

        const auth = getState().auth;
        const token = auth?.token;

        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.get(`${baseURL}/questions/${category}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            category,
            data: response.data?.data?.data || [],
        };
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoryData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategoryData.fulfilled, (state, action) => {
                const { category, data } = action.payload;
                state.categories[category] = data;
                state.isLoading = false;
            })
            .addCase(fetchCategoryData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//     categories: {},
//     isLoading: false,
//     error: null,
// };

// export const fetchCategoryData = createAsyncThunk(
//     "category/fetchCategoryData",
//     async (category, { getState, rejectWithValue }) => {
//         const baseURL = "https://loopsexam.xyz/api/v1/admin";
//         const auth = getState().auth;
//         const token = auth?.token;

//         if (!token) {
//             return rejectWithValue("No authentication token found");
//         }

//         try {
//             const response = await axios.get(`${baseURL}/questions/${category}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             return {
//                 category,
//                 data: response.data?.data?.data || [],
//             };
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 // Handle token expiration or invalid token error
//                 return rejectWithValue("Token expired");
//             }
//             return rejectWithValue(error.message);
//         }
//     }
// );

// const categorySlice = createSlice({
//     name: "category",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchCategoryData.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(fetchCategoryData.fulfilled, (state, action) => {
//                 const { category, data } = action.payload;
//                 state.categories[category] = data;
//                 state.isLoading = false;
//             })
//             .addCase(fetchCategoryData.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload || action.error.message;
//             });
//     },
// });

// export default categorySlice.reducer;

