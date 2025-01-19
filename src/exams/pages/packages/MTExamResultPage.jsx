import Loading from "@/exams/components/atoms/Loading";
import { MTExamListForResult } from "@/exams/components/molecules/packages/mtexam/mtexamresult/MTExamListForResult";
import { ResultsHeader } from "@/exams/components/molecules/packages/mtexam/mtexamresult/ResultsHeader";
import { StatisticsGrid } from "@/exams/components/molecules/packages/mtexam/mtexamresult/StatisticsGrid";
import { useGetSingleStuResultQuery } from "@/features/packages/packagesApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MTExamResultPage = () => {
    const { modelTestId } = useParams();
    const auth = useSelector((state) => state.auth);

    const { data: studentResultData, isLoading: isMTExamResultLoading } = useGetSingleStuResultQuery({
        modelTestId: modelTestId,
        studentId: auth.student.id,
    });

    if (isMTExamResultLoading) {
        return <Loading />;
    }

    const { model_test_details, combined_result, all_examination_details } = studentResultData?.message || {};

    return (
        <div className="px-5 w-full">
            {/* Result Header Section */}
            <ResultsHeader modelTestDetails={model_test_details} combinedResult={combined_result} />

            {/* Statistics Section */}
            <StatisticsGrid combinedResult={combined_result} />

            {/* All Examination Details Section */}
            <div className="mt-10">
                <h2 className="text-lg font-bold mb-5">All Exam Submissions</h2>
                <MTExamListForResult
                    allExaminations={all_examination_details}
                    modelTestId={modelTestId}
                />
            </div>
        </div>
    );
};

export default MTExamResultPage;
