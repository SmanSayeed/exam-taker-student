import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mtExam: {},
    questions_list: [],
    mcqAnswers: []
};

const mtExamSlice = createSlice({
    name: "exam",
    initialState,
    reducers: {
        saveMTExamInfo: (state, action) => {
            state.mtExam = action.payload.mtExam;
            state.questions_list = action.payload.questions_list;
            state.mcqAnswers = action.payload.questions_list.map(question => {
                const firstMcqQuestionId = question?.mcq_questions?.[0]?.id || null;

                return {
                    question_id: question.id,
                    mcq_question_id: firstMcqQuestionId,
                    submitted_mcq_option: null
                }
            });
        },
        // updateMcqAnswer: (state, action) => {
        //     const { question_id, mcq_question_id, submitted_mcq_option } = action.payload;
        //     const answerIndex = state.mcqAnswers?.findIndex(answer => answer?.question_id === question_id);

        //     if (answerIndex !== -1) {
        //       state.mcqAnswers[answerIndex] = { question_id, mcq_question_id, submitted_mcq_option };
        //     }
        // },
        clearMTExamInfo: (state) => {
            state.exam = {};
            state.questions_list = [];
            state.mcqAnswers = [];
        }
    },
});

export const { saveMTExamInfo, clearMTExamInfo } = mtExamSlice.actions;
export default mtExamSlice.reducer;
