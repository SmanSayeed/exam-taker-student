import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exam: {},
    questions_list: [],
    timeLeft: null,
    mcqAnswers: []
};

const examSlice = createSlice({
    name: "exam",
    initialState,
    reducers: {
        saveExamInfo: (state, action) => {
            state.exam = action.payload.exam;
            state.questions_list = action.payload.questions_list;
            // Initialize mcqAnswers when exam data is saved
            state.mcqAnswers = action.payload.questions_list.map(question => {
                const firstMcqQuestionId = question?.mcq_questions?.[0]?.id || null;

                return {
                    question_id: question.id,
                    mcq_question_id: firstMcqQuestionId,
                    submitted_mcq_option: null
                }
            });
        },
        updateMcqAnswer: (state, action) => {
            const { question_id, mcq_question_id, submitted_mcq_option } = action.payload;
            const answerIndex = state.mcqAnswers?.findIndex(answer => answer?.question_id === question_id);

            if (answerIndex !== -1) {
              state.mcqAnswers[answerIndex] = { question_id, mcq_question_id, submitted_mcq_option };
            }
        },
        clearExamInfo: (state) => {
            state.exam = {};
            state.questions_list = [];
            state.timeLeft = null;
            state.mcqAnswers = [];
        },
        updateTimeLeft: (state, action) => {
            state.timeLeft = action.payload;
        },
    },
});

export const { saveExamInfo, clearExamInfo, updateTimeLeft, updateMcqAnswer } = examSlice.actions;
export default examSlice.reducer;
