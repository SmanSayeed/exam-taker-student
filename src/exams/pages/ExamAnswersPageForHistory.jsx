import { Card, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetExamByIdQuery } from "../features/exams/examsApi";

const ExamAnswersPageForHistory = () => {
    const { id } = useParams();
    const { data: examData } = useGetExamByIdQuery(id);

    useEffect(() => {
        console.log("allexams", examData?.exam);
    }, [examData?.exam]);

    const results = examData?.exam?.answers[0]?.mcq_answers.reduce((acc, answer) => {
        if (answer.submitted_mcq_option === null) {
            acc.skipped++;
        } else if (answer.is_submitted_correct) {
            acc.correct++;
        } else {
            acc.incorrect++;
        }
        return acc;
    }, { correct: 0, incorrect: 0, skipped: 0 });

    return (
        <div className="px-5 w-full ">
            <Card className="text-center p-4 relative">
                <CardTitle> Mock Exam </CardTitle>
                <p className="mt-4">Total marks: 10</p>
                <div className="mt-6 flex items-center justify-center gap-4">
                    <p>{results?.correct} Correct</p>
                    <p>{results?.skipped} Skipped</p>
                    <p>{results?.incorrect} Incorrect</p>
                </div>
                <p className="mt-4">
                    {/* MCQ: {examData?.exam.questions_list[0].mark}/{mcq_answers.length} */}
                </p>
            </Card>

            <div className="text-center">
                {/* {examData?.exam?.type === "mcq" && (
                    <ExamResultForMcq
                        submittedQues={examData?.questions_list}
                    />
                )} */}
                {/* {examData.type === "normal" && <NormalExamPage />}
                {examData.type === "creative" && <CreativeExamPage />} */}
            </div>
        </div>
    )
}

export default ExamAnswersPageForHistory;