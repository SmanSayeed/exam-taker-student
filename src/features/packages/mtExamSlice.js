import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allMTExams: [], // List of started exams
    activeExam: null, // Currently active exam
};

const mtExamSlice = createSlice({
    name: "mtExam",
    initialState,
    reducers: {
        saveMTExamInfo: (state, action) => {
            const existingExamIndex = state.allMTExams.findIndex(
                (item) => item.exam.id === action.payload.exam.id
            );

            if (existingExamIndex === -1) {
                // Add a new exam if it doesn't exist
                state.allMTExams.push({
                    ...action.payload,
                    mcqAnswers: action.payload.mcqAnswers || [], // Initialize mcqAnswers
                });
            } else {
                // Update the existing exam's mcqAnswers if it exists
                state.allMTExams[existingExamIndex].mcqAnswers = [
                    ...(state.allMTExams[existingExamIndex].mcqAnswers || []),
                    ...(action.payload.mcqAnswers || []),
                ];
            }

            // Set the active exam to the one just saved
            state.activeExam = {
                ...action.payload,
                mcqAnswers: action.payload.mcqAnswers || [],
            };
        },
        switchActiveExam: (state, action) => {
            const existingExam = state.allMTExams.find(
                (item) => item.exam.id === action.payload.exam.id
            );

            if (existingExam) {
                // Persist existing mcqAnswers to the exam before switching
                if (state.activeExam) {
                    const activeExamIndex = state.allMTExams.findIndex(
                        (item) => item.exam.id === state.activeExam.exam.id
                    );
                    if (activeExamIndex !== -1) {
                        state.allMTExams[activeExamIndex].mcqAnswers = state.activeExam.mcqAnswers;
                    }
                }

                // Switch to the new active exam
                state.activeExam = {
                    ...existingExam,
                    mcqAnswers: [...existingExam.mcqAnswers],
                };
            }
        },
        updateMTMcqAnswer: (state, action) => {
            const { question_id, mcq_question_id, submitted_mcq_option } = action.payload;

            // Ensure there's an active exam
            if (state.activeExam) {
                const { mcqAnswers } = state.activeExam;
                
                const answerIndex = mcqAnswers?.findIndex(
                    (answer) => answer.question_id === question_id
                );

                if (answerIndex !== -1) {
                    // Update existing answer
                    mcqAnswers[answerIndex] = { question_id, mcq_question_id, submitted_mcq_option };
                } else {
                    // Add new answer if it doesn't exist
                    mcqAnswers.push({ question_id, mcq_question_id, submitted_mcq_option });
                }
            }
        },
        clearMTExamInfo: (state) => {
            state.allMTExams = [];
            state.activeExam = null;
        },
    },
});

export const {
    saveMTExamInfo,
    switchActiveExam,
    updateMTMcqAnswer,
    clearMTExamInfo,
} = mtExamSlice.actions;
export default mtExamSlice.reducer;






// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     allMTExams: [], // List of started exams
//     activeExam: null, // Currently active exam
// };

// const mtExamSlice = createSlice({
//     name: "mtExam",
//     initialState,
//     reducers: {
//         saveMTExamInfo: (state, action) => {
//             const existingExam = state.allMTExams.length > 0 && state.allMTExams.find(
//                 (item) => item.exam.id === action.payload.exam.id
//             );

//             if (!existingExam) {
//                 state.allMTExams.push(action.payload);
//             }

//             state.activeExam = action.payload; // Set the newly started exam as active
//         },
//         switchActiveExam: (state, action) => {
//             const existingExam = state.allMTExams.length > 0 && state.allMTExams.find(
//                 (item) => item.exam.id === action.payload.exam.id
//             );

//             if (existingExam) {
//                 state.activeExam = existingExam; // Switch to another exam
//             }
//         },
//         updateMTMcqAnswer: (state, action) => {
//             const { question_id, mcq_question_id, submitted_mcq_option } = action.payload;

//             // Ensure there's an active exam
//             if (state.activeExam) {
//                 const { mcqAnswers } = state.activeExam;
//                 const answerIndex = mcqAnswers?.findIndex(
//                     (answer) => answer.question_id === question_id
//                 );

//                 if (answerIndex !== -1) {
//                     // Update existing answer
//                     mcqAnswers[answerIndex] = { question_id, mcq_question_id, submitted_mcq_option };
//                 } else {
//                     // Add new answer if it doesn't exist
//                     mcqAnswers.push({ question_id, mcq_question_id, submitted_mcq_option });
//                 }
//             }
//         },
//         clearMTExamInfo: (state) => {
//             state.allMTExams = [];
//             state.activeExam = null;
//         },
//     },
// });

// export const { saveMTExamInfo, switchActiveExam, updateMTMcqAnswer, clearMTExamInfo } = mtExamSlice.actions;
// export default mtExamSlice.reducer;




// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     mtExam: {},
//     questions_list: [],
//     mcqAnswers: []
// };

// const mtExamSlice = createSlice({
//     name: "mtExam",
//     initialState,
//     reducers: {
//         saveMTExamInfo: (state, action) => {
//             state.mtExam = action.payload.mtExam;
//             state.questions_list = action.payload.questions_list;
//             state.mcqAnswers = action.payload.questions_list.map(question => {
//                 const firstMcqQuestionId = question?.mcq_questions?.[0]?.id || null;

//                 return {
//                     question_id: question.id,
//                     mcq_question_id: firstMcqQuestionId,
//                     submitted_mcq_option: null
//                 }
//             });
//         },
//         updateMTMcqAnswer: (state, action) => {
//             const { question_id, mcq_question_id, submitted_mcq_option } = action.payload;
//             const answerIndex = state.mcqAnswers?.findIndex(answer => answer?.question_id === question_id);

//             if (answerIndex !== -1) {
//               state.mcqAnswers[answerIndex] = { question_id, mcq_question_id, submitted_mcq_option };
//             }
//         },
//         clearMTExamInfo: (state) => {
//             state.exam = {};
//             state.questions_list = [];
//             state.mcqAnswers = [];
//         }
//     },
// });

// export const { saveMTExamInfo, clearMTExamInfo, updateMTMcqAnswer } = mtExamSlice.actions;
// export default mtExamSlice.reducer;
