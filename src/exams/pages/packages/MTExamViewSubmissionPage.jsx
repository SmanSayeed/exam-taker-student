import { Card, CardTitle } from "@/components/ui/card";
import Loading from "@/exams/components/atoms/Loading";
import { CreativeQuesForSubmissionView } from "@/exams/components/molecules/packages/mtexam/mtexamresult/CreativeQuesForSubmissionView";
import { McqQuesForSubmissionView } from "@/exams/components/molecules/packages/mtexam/mtexamresult/McqQuesForSubmissionView";
import { NormalQuesForSubmissionView } from "@/exams/components/molecules/packages/mtexam/mtexamresult/NormalQuesForSubmissionView";
import { useGetAllStuResultQuery } from "@/features/packages/mtExamsApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MTExamViewSubmissionPage = () => {
    const { modelTestId, examId } = useParams();
    const auth = useSelector((state) => state.auth);

    const { data: allStuResultData, isLoading: isMTExamResultLoading } = useGetAllStuResultQuery(modelTestId);

    const { students_results } = allStuResultData?.message || {};
    const foundStuResultDetails = students_results?.find(stu => stu?.student_details?.id === auth.student.id);
    const foundExam = foundStuResultDetails?.examinations?.find(exam => exam.examination_id === parseInt(examId));

    if (isMTExamResultLoading) {
        return <Loading />;
    }

    return (
        <div>
            <div className="px-5 w-full">
                <Card className="text-center p-4 relative mt-2">
                    <CardTitle>{foundExam?.title}</CardTitle>
                    <p>Type: {foundExam?.type}</p>
                    <p>Marks Obtained: {foundExam?.obtained_marks}</p>
                    <p>Submission Time: {foundExam?.submission_time}</p>
                    <p>
                        Exam Started At: {foundExam?.exam_start_time} | Time Out:{" "}
                        {foundExam?.is_exam_time_out ? "Yes" : "No"}
                    </p>
                </Card>

                <div className="text-center">
                    {/* mcq exam question */}
                    {foundExam?.type === "mcq" &&
                        foundExam?.questions.map((question, index) => (
                            <McqQuesForSubmissionView
                                key={question?.id}
                                queIndex={index}
                                question={question}
                            />
                        ))}

                    {/* creative question exam question */}
                    {foundExam?.type === "creative" &&
                        foundExam?.questions.map((question, index) => (
                            <CreativeQuesForSubmissionView
                                key={question?.id}
                                queIndex={index}
                                question={question}
                            />
                        ))}

                    {/* normal question exam question */}
                    {foundExam?.type === "normal" &&
                        foundExam?.questions.map((question, index) => (
                            <NormalQuesForSubmissionView
                                key={question?.id}
                                queIndex={index}
                                question={question}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default MTExamViewSubmissionPage;
