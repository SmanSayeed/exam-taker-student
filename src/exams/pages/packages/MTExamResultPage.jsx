import Loading from "@/exams/components/atoms/Loading";
import { MTExamListForResult } from "@/exams/components/molecules/packages/mtexam/mtexamresult/MTExamListForResult";
import { ResultsHeader } from "@/exams/components/molecules/packages/mtexam/mtexamresult/ResultsHeader";
import { useGetAllStuResultQuery } from "@/features/packages/mtExamsApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MTExamResultPage = () => {
    const { modelTestId } = useParams();
    const auth = useSelector((state) => state.auth);

    const { data: allStuResultData, isLoading: isMTExamResultLoading } = useGetAllStuResultQuery(modelTestId);

    const { model_test_details, students_results } = allStuResultData?.message || {};

    const foundStuResultDetails = students_results?.find(stu => stu?.student_details?.id === auth.student.id);

    if (isMTExamResultLoading) {
        return <Loading />;
    }

    return (
        <div className="px-5 w-full">
            {/* Result Header Section */}
            <ResultsHeader
                modelTestDetails={model_test_details}
                totalMarks={foundStuResultDetails?.total_marks}
            />

            {/* Statistics Section */}
            {/* <StatisticsGrid combinedResult={combined_result} /> */}

            {/* All Examination Details Section */}
            <div className="mt-10">
                <h2 className="text-lg font-bold mb-5">All Exam Submissions</h2>
                <MTExamListForResult
                    allExaminations={foundStuResultDetails?.examinations}
                    modelTestId={modelTestId}
                />
            </div>
        </div>
    );
};

export default MTExamResultPage;
