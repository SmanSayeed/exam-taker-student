import { Card, CardTitle } from "@/components/ui/card";
import { useSelector } from "react-redux";
import ExamResultForMcq from "../components/organism/exams/ExamResultForMcq";
import { useGetExamByIdQuery } from "../features/exams/examsApi";

const ExamResultPage = () => {
    const submittedExam = useSelector(state => state.submittedExam);
    const { examination, mcq_answers } = submittedExam;

    // const calculateResults = (mcq_answers) => {
    //     let correct = 0;
    //     let incorrect = 0;
    //     let skipped = 0;

    //     mcq_answers.forEach(answer => {
    //         if (answer.submitted_mcq_option === null) {
    //             skipped++;
    //         } else if (answer.is_correct) {
    //             correct++;
    //         } else {
    //             incorrect++;
    //         }
    //     });

    //     return {
    //         correct,
    //         incorrect,
    //         skipped
    //     };
    // };
    // const results = calculateResults(mcq_answers);

    const results = mcq_answers.reduce((acc, answer) => {
        if (answer.submitted_mcq_option === null) {
            acc.skipped++;
        } else if (answer.is_correct) {
            acc.correct++;
        } else {
            acc.incorrect++;
        }
        return acc;
    }, { correct: 0, incorrect: 0, skipped: 0 });

    console.log(results);

    const { data: examData } = useGetExamByIdQuery(examination.id);

    return (
        <div className="px-5 w-full ">
            <Card className="text-center p-4 relative">
                <CardTitle> Mock Exam </CardTitle>
                <div className="mt-6 flex items-center justify-center gap-4">
                    <p>{results.correct} Correct</p>
                    <p>{results.skipped} Skipped</p>
                    <p>{results.incorrect} Incorrect</p>
                </div>
                <p className="mt-4">
                    MCQ: {examData?.questions_list[0].mark}/{mcq_answers.length}
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