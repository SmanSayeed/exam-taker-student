import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allMTExams: [], 
    activeExam: null, 
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
                    mcqAnswers: action.payload.mcqAnswers || [],
                    fileUrl: action.payload.fileUrl || null, // Add fileUrl
                });
            } else {
                // Update the existing exam's mcqAnswers if it exists
                state.allMTExams[existingExamIndex].mcqAnswers = [
                    ...(state.allMTExams[existingExamIndex].mcqAnswers || []),
                    ...(action.payload.mcqAnswers || []),
                ];
                state.allMTExams[existingExamIndex].fileUrl = action.payload.fileUrl || null; // Update fileUrl
            }

            // Set the active exam to the one just saved
            state.activeExam = {
                ...action.payload,
                mcqAnswers: action.payload.mcqAnswers || [],
                fileUrl: action.payload.fileUrl || null, // Add fileUrl
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
                        state.allMTExams[activeExamIndex].fileUrl = state.activeExam.fileUrl; // Persist fileUrl
                    }
                }

                // Switch to the new active exam
                state.activeExam = {
                    ...existingExam,
                    mcqAnswers: [...existingExam.mcqAnswers],
                    fileUrl: existingExam.fileUrl || null, // Set fileUrl
                };
            }
        },
        updateMTMcqAnswer: (state, action) => {
            const { question_id, mcq_question_id, submitted_mcq_option } = action.payload;
        
            if (state.activeExam) {
                const { exam } = state.activeExam;
                const { mcqAnswers } = state.activeExam;
        
                // Update mcqAnswers in the active exam
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
        
                // Find the corresponding exam in allMTExams and update its mcqAnswers
                const examIndex = state.allMTExams.findIndex((item) => item.exam.id === exam.id);
        
                if (examIndex !== -1) {
                    const allExamMcqAnswers = state.allMTExams[examIndex].mcqAnswers || [];
                    const allExamAnswerIndex = allExamMcqAnswers.findIndex(
                        (answer) => answer.question_id === question_id
                    );
        
                    if (allExamAnswerIndex !== -1) {
                        // Update existing answer
                        allExamMcqAnswers[allExamAnswerIndex] = {
                            question_id,
                            mcq_question_id,
                            submitted_mcq_option,
                        };
                    } else {
                        // Add new answer if it doesn't exist
                        allExamMcqAnswers.push({
                            question_id,
                            mcq_question_id,
                            submitted_mcq_option,
                        });
                    }
        
                    state.allMTExams[examIndex].mcqAnswers = [...allExamMcqAnswers];
                }
            }
        },
        // updateFileUrl: (state, action) => {
        //     const { examId, fileUrl,  } = action.payload;

        //     if (state.activeExam?.exam.id === examId) {
        //         state.activeExam.fileUrl = fileUrl; // Update fileUrl for activeExam
        //     }

        //     const examIndex = state.allMTExams.findIndex((item) => item.exam.id === examId);

        //     if (examIndex !== -1) {
        //         state.allMTExams[examIndex].fileUrl = fileUrl; // Update fileUrl in allMTExams
        //     }
        // },
        updateFileUrl: (state, action) => {
            const { examId, fileUrl } = action.payload;
        
            const validFileUrl = {
                cdn_url: fileUrl.cdn_url || null,
                file_name: fileUrl.file_name || null,
                file_size: fileUrl.file_size || null,
            };
        
            if (state.activeExam?.exam.id === examId) {
                state.activeExam.fileUrl = validFileUrl;
            }
        
            const examIndex = state.allMTExams.findIndex((item) => item.exam.id === examId);
        
            if (examIndex !== -1) {
                state.allMTExams[examIndex].fileUrl = validFileUrl;
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
    updateFileUrl
} = mtExamSlice.actions;
export default mtExamSlice.reducer;