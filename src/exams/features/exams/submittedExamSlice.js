import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    examination: {},
    student: {},
    mcq_answers: [],
    creative_answers: [],
    normal_answers: [],
};

const submittedExamSlice = createSlice({
    name: "submittedExam",
    initialState,
    reducers: {
        submittedExamInfo: (state, action) => {
            state.examination = action.payload.examination;
            state.student = action.payload.student;
            state.mcq_answers = action.payload.mcq_answers;
            state.creative_answers = action.payload.creative_answers;
            state.normal_answers = action.payload.normal_answers;
        },
    },
});

export const { submittedExamInfo } = submittedExamSlice.actions;
export default submittedExamSlice.reducer;
