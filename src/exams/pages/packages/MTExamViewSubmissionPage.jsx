import { McqQuesForSubmissionView } from "@/exams/components/molecules/packages/mtexam/mtexamresult/McqQuesForSubmissionView";
import { useGetExamsUnderMTQuery } from "@/features/packages/packagesApi";
import { useGetQuestionsQuery } from "@/features/questions/questionsApi";
import { useParams } from "react-router-dom";

const MTExamViewSubmissionPage = () => {
    const { modelTestId, examId } = useParams();

    const { data: allExamsUnderMT } = useGetExamsUnderMTQuery(modelTestId);

    const selectedExam = allExamsUnderMT?.data?.find((exam) => exam.id === parseInt(examId));
    console.log("Selected Exam:", selectedExam);

    const questionIds = selectedExam?.questions?.split(",").map((id) => parseInt(id)) || [];
    console.log("questionids", questionIds)

    const { data: allQuestions } = useGetQuestionsQuery();
    console.log("allQuestions", allQuestions)

    return (
        <div>
            <h1>MTExamViewSubmissionPage</h1>
            {
                questionIds.map((queId) => (
                    <McqQuesForSubmissionView
                        key={queId}
                        queId={queId}
                    />
                ))
            }
        </div>
    );
};

export default MTExamViewSubmissionPage;
