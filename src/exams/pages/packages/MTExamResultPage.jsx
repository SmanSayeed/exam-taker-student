import { Card } from "@/components/ui/card";
import Loading from "@/exams/components/atoms/Loading";
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

    const { model_test_details, combined_result } = studentResultData?.message || {};

    const accuracy = (
        (combined_result?.correct_answers / combined_result?.total_questions) *
        100
    ).toFixed(2);

    return (
        <div className="px-5 w-full">
            {/* Header Section */}
            <Card className="p-6 my-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">{model_test_details?.title}</h1>
                        <p className="">Model Test Results</p>
                    </div>

                    <div className="flex items-center gap-4 mx-auto md:mx-0">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">
                                {combined_result?.total_obtained_marks}<span className="text-base text-muted-foreground">/{model_test_details?.full_mark}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Total Score</p>
                        </div>
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy h-8 w-8 text-primary" data-sentry-element="Trophy" data-sentry-source-file="ResultsHeader.tsx"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                        </div>
                    </div>
                </div>
                <div className="relative w-full bg-gray-700 h-2 rounded mt-4">
                    <div
                        className="absolute top-0 left-0 bg-blue-500 h-2 rounded"
                        style={{
                            width: `${(combined_result?.total_obtained_marks /
                                model_test_details?.full_mark) *
                                100}%`,
                        }}
                    ></div>
                </div>
            </Card>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4 text-center flex items-center gap-4 justify-center">
                    <div className="p-2 bg-gray-300 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target h-6 w-6 text-blue-500"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Questions</p>
                        <h2 className="text-2xl font-bold text-start">{combined_result?.total_questions}</h2>
                    </div>
                </Card>
                <Card className="p-4 text-center flex items-center gap-4 justify-center">
                    <div className="p-2 bg-gray-300 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check h-6 w-6 text-green-500"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Correct Answers</p>
                        <h2 className="text-2xl font-bold text-green-500 text-start">
                            {combined_result?.correct_answers}
                        </h2>
                    </div>
                </Card>
                <Card className="p-4 text-center flex items-center gap-4 justify-center">
                    <div className="p-2 bg-gray-300 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock h-6 w-6 text-orange-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Time Spent</p>
                        <h2 className="text-2xl font-bold text-start">{combined_result?.time_spent}</h2>
                    </div>
                </Card>
                <Card className="p-4 text-center flex items-center gap-4 justify-center">
                    <div className="p-2 bg-gray-300 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-percent h-6 w-6 text-purple-500"><line x1="19" x2="5" y1="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Accuracy</p>
                        <h2 className="text-2xl font-bold text-purple-500 text-start">{accuracy}%</h2>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default MTExamResultPage;

