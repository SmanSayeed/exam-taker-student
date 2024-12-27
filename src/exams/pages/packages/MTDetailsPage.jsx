import { Button } from "@/components/ui/button";
import { hasActiveExams } from "@/exams/components/molecules/packages/mtexam/examHelpers";
import { MTExamTimer } from "@/exams/components/molecules/packages/mtexam/MTExamTimer";
import { MTExamCard } from "@/exams/components/molecules/packages/MTExamCard";
import { useGetExamsUnderMTQuery, useGetSingleModelTestQuery, useGetSinglePackageQuery } from "@/features/packages/packagesApi";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export const MTDetailsPage = () => {
    const { packageId, modelTestId } = useParams();

    const { data: singlePackage } = useGetSinglePackageQuery(packageId);
    const isSubscribed = singlePackage?.data?.is_subscribed;

    const { data: modelTestData } = useGetSingleModelTestQuery(modelTestId);
    const { data: examsUnderMT, isLoading: isExamsUnderMTLoading } = useGetExamsUnderMTQuery(modelTestId);

    const startTime = modelTestData?.data?.start_time;
    const endTime = modelTestData?.data?.end_time;
    const isExamsActive = hasActiveExams(startTime, endTime);

    const handleFinishAllExams = (event) => {
        event.preventDefault();

        // finish all exmams api call
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            {/* Header Section */}
            <header className="bg-white shadow w-full px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {parseHtmlContent(modelTestData?.data?.title) || "Model Test Details"}
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl px-6 mt-6">
                <section className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Available Exams</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            isExamsUnderMTLoading ? (
                                <Loader2 />
                            ) : (
                                examsUnderMT?.data && examsUnderMT?.data?.length > 0 ? (
                                    examsUnderMT?.data.map((exam) => (
                                        <MTExamCard
                                            key={exam?.id}
                                            exam={exam}
                                            isSubscribed={isSubscribed}
                                            packageId={packageId}
                                            modelTestId={modelTestId}
                                        />
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">No exams available</p>
                                )
                            )
                        }
                        {
                            !isSubscribed && (
                                <div className="mt-2">
                                    <p className="text-red-500 text-sm">
                                        Please enroll to attend the exam!
                                    </p>
                                    <Link
                                        to={`/package/${packageId}`}
                                        className="text-blue-500 underline text-sm hover:text-blue-600"
                                    >
                                        Click here
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </section>

                {/* Fixed Timer and Button Section */}
                {
                    isExamsActive && isSubscribed && (
                        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex flex-col justify-center items-center gap-2">
                            <MTExamTimer startTime={startTime} endTime={endTime} />

                            <Button
                                onClick={handleFinishAllExams}
                                className="bg-red-500 hover:bg-red-600 text-white text-lg px-6 py-3 w-full"
                            >
                                Finish All Exams
                            </Button>
                        </div>
                    )
                }
            </main>
        </div>
    );
};

