import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    submittedMTExamData: {},
    allMTExamsSubmitted: {}
};

const submittedMTExamSlice = createSlice({
    name: "submittedMTExam",
    initialState,
    reducers: {
        submittedMTExamInfo: (state, action) => {
            state.submittedMTExamData = action.payload;
        },
        updateMTExamSubmittedStatus: (state, action) => {
            state.allMTExamsSubmitted = {
                ...state.allMTExamsSubmitted,
                modelTestId: action.payload.modelTestId,
                isMTExamSubmmitted: action.payload.isMTExamSubmmitted
            };
        }
    },
});

export const { submittedMTExamInfo } = submittedMTExamSlice.actions;
export default submittedMTExamSlice.reducer;
