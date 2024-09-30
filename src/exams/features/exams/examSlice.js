import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exam: {},
    questions_list: [],
    time_count: null
};

const examSlice = createSlice({
    name: "exam",
    initialState,
    reducers: {
        saveExamInfo: (state, action) => {
            state.exam = action.payload.exam;
            state.questions_list = action.payload.questions_list;
            state.time_count = action.payload.time_count
        },
        clearExamInfo: (state) => {
            state.exam = {};
            state.questions_list = [];
            state.time_count=null
        }, 
    },
});

export const { saveExamInfo, clearExamInfo } = examSlice.actions;
export default examSlice.reducer;
