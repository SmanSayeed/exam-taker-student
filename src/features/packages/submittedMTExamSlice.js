import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    submittedMTExamData: {}
};

const submittedMTExamSlice = createSlice({
    name: "submittedMTExam",
    initialState,
    reducers: {
        submittedMTExamInfo: (state, action) => {
            state.submittedMTExamData = action.payload;
        },
    },
});

export const { submittedMTExamInfo } = submittedMTExamSlice.actions;
export default submittedMTExamSlice.reducer;
