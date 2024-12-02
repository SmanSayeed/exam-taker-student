import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useGetExamByIdQuery } from "@/features/exams/examsApi";
import { Circle } from "lucide-react";
import { useSelector } from "react-redux";
import Loading from "../components/atoms/Loading";
import ExamResultForMcq from "../components/organism/exams/ExamResultForMcq";

const ExamResultPage = () => {
    const submittedExam = useSelector(state => state.submittedExam);
    const { examination, mcq_answers, total_marks } = submittedExam;

    const results = mcq_answers.reduce((acc, answer) => {
        if (answer.submitted_mcq_option === null) {
            acc.skipped++;
        } else if (answer.is_submitted_correct) {
            acc.correct++;
        } else {
            acc.incorrect++;
        }
        return acc;
    }, { correct: 0, incorrect: 0, skipped: 0 });

    const { data: examData, isLoading: isExamResultLoading } = useGetExamByIdQuery(examination.id);

    const totalExamMarks = (examData?.questions_list[0].mark * examData?.questions_list?.length);
    const percentage = Math.round((total_marks / totalExamMarks) * 100);

    // const subjectId = examData?.questions_list[0]?.attachable?.subject_id;
    // const { data: subjectData } = useGetCategoryByIdQuery({ category: "subjects", id: subjectId });
    // const subjectName = subjectData?.data?.title;

    if (isExamResultLoading) {
        return <Loading />
    }

    return (
        <div className="px-5 w-full ">
            <Card className="text-center p-4 my-6">
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="mt-4 text-lg">Marks: {total_marks}/{totalExamMarks} ({`${percentage}%`})</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <p className="flex items-center gap-1"> <Circle size={14} fill="green" strokeWidth={0} /> Correct: {results.correct} </p>
                        <p className="flex items-center gap-1"> <Circle size={14} fill="red" strokeWidth={0} /> Wrong: {results.incorrect} </p>
                        <p className="flex items-center gap-1"> <Circle size={14} fill="yellow" strokeWidth={0} /> Skipped: {results.skipped} </p>
                        {/* <p className="flex items-center gap-1"> <Circle size={14} fill="gray" strokeWidth={0} /> Negative: </p> */}
                    </div>
                </div>
            </Card>

            <div className="flex flex-col items-center justify-center gap-4 pb-6">
                <div className="flex gap-2">
                    {/* <Badge variant="green"><Timer /> finishing Time here</Badge> */}
                    {/* <Button variant="outline">Restart</Button> */}
                </div>
                {/* <h1 className="text-xl"> {subjectName} ({examData?.questions_list?.length})</h1> */}
                <div className="flex gap-2">
                    <Badge variant="secondary" className="text-sm">All({examData?.questions_list?.length})</Badge>
                    <Badge variant="destructive" className="text-sm">Wrong({results.incorrect})</Badge>
                    <Badge variant="green" className="text-sm">Correct({results.correct})</Badge>
                    <Badge variant="yellow" className="text-sm">Skipped({results.skipped})</Badge>
                </div>
            </div>

            <div className="text-center">
                {examData?.exam?.type === "mcq" && (
                    <ExamResultForMcq
                        submittedQues={examData?.questions_list}
                    />
                )}

                {/* {examData.type === "normal" && <NormalExamPage />}
                {examData.type === "creative" && <CreativeExamPage />} */}
            </div>
        </div>
    )
}

export default ExamResultPage