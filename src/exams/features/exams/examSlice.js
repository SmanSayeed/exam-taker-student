import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exam: {},
    questions_list: [],
};

const examSlice = createSlice({
    name: "exam",
    initialState,
    reducers: {
        saveExamInfo: (state, action) => {
            state.exam = action.payload.exam;
            state.questions_list = action.payload.questions_list;
        },
        clearExamInfo: (state) => {
            state.exam = {};
            state.questions_list = [];
        }, 
    },
});

export const { saveExamInfo, clearExamInfo } = examSlice.actions;
export default examSlice.reducer;
