import { Card, CardTitle } from "@/components/ui/card";
import { useSelector } from "react-redux";
import ExamResultForMcq from "../components/organism/exams/ExamResultForMcq";
import { useGetExamByIdQuery } from "../features/exams/examsApi";

const ExamResultPage = () => {
    const submittedExam = useSelector(state => state.submittedExam);
    const { examination } = submittedExam;

    const { data: examData } = useGetExamByIdQuery(examination.id);
    console.log("examData", examData)

    return (
        <div className="px-5 w-full ">
            <Card className="text-center p-4 relative">
                <CardTitle> Mock Exam </CardTitle>
                <div className="mt-6 flex items-center justify-center gap-4">
                    <p>6 Correct</p>
                    <p>0 Skipped</p>
                    <p>19 Incorrect</p>
                </div>
                <p className="mt-4">
                    MCQ: 1.25/25
                </p>
            </Card>

            <div className="text-center">
                {examData?.exam?.type === "mcq" && (
                    <ExamResultForMcq
                        filteredQues={examData?.questions_list}
                    />
                )}
                {/* {examData.type === "normal" && <NormalExamPage />}
                {examData.type === "creative" && <CreativeExamPage />} */}

            </div>
        </div>
    )
}

export default ExamResultPage