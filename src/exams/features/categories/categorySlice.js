import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// initial state
const initialState = {
    categories: {},
    isLoading: false,
    error: null,
}

// Thunk for fetching category data
export const fetchCategoryData = createAsyncThunk(
    "category/fetchCategoryData",
    async (category, { getState }) => {
        const baseURL = import.meta.env.VITE_SERVER_BASE_URL_2;

        const storedAuth = localStorage.getItem("auth");
        const auth = storedAuth ? JSON.parse(storedAuth) : null;
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
