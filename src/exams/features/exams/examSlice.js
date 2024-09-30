import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exam: {},
    questions_list: [],
    timeLeft: null
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
            state.timeLeft = null;
        }, 
        updateTimeLeft: (state, action) => {
            state.timeLeft = action.payload;
        },
    },
});

export const { saveExamInfo, clearExamInfo, updateTimeLeft } = examSlice.actions;
export default examSlice.reducer;
