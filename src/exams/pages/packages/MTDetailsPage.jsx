import { Button } from "@/components/ui/button";
import { hasActiveExams } from "@/exams/components/molecules/packages/mtexam/examHelpers";
import { MTExamTimer } from "@/exams/components/molecules/packages/mtexam/MTExamTimer";
import { MTExamCard } from "@/exams/components/molecules/packages/MTExamCard";
import {
    useFinishAllMTExamMutation,
    useGetExamsUnderMTQuery,
    useGetSingleModelTestQuery,
    useGetSinglePackageQuery,
} from "@/features/packages/packagesApi";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const MTDetailsPage = () => {
    const [selectedOptionalExams, setSelectedOptionalExams] = useState([]);

    const { packageId, modelTestId } = useParams();
    const auth = useSelector((state) => state.auth);
    const { allMTExams } = useSelector(state => state.mtExam);

    const allMcqAnswers = allMTExams.flatMap((exam) => exam.mcqAnswers);
    console.log("allmcqanswers", allMcqAnswers);

    const { data: singlePackage } = useGetSinglePackageQuery(packageId);
    const isSubscribed = singlePackage?.data?.is_subscribed;

    const { data: modelTestData } = useGetSingleModelTestQuery(modelTestId);
    const { data: examsUnderMT, isLoading: isExamsUnderMTLoading } = useGetExamsUnderMTQuery(modelTestId);

    const startTime = modelTestData?.data?.start_time;
    const endTime = modelTestData?.data?.end_time;
    const isExamsActive = hasActiveExams(startTime, endTime);

    const [finishAllMTExam, { isLoading: isFinishingExam }] = useFinishAllMTExamMutation();

    // Separate Optional and Compulsory Exams
    const optionalExams = examsUnderMT?.data?.filter((exam) => exam?.is_optional === 1) || [];
    const compulsoryExams = examsUnderMT?.data?.filter((exam) => exam?.is_optional === 0) || [];

    const handleFinishAllExams = async (event) => {
        event.preventDefault();

        const payload = new FormData();

        payload.append("examination_id", modelTestId);
        payload.append("student_id", auth.student.id);
        payload.append("type", "mcq");
        payload.append("mcq_answers", allMcqAnswers);

        try {
            const response = await finishAllMTExam(payload).unwrap();
            console.log("response", response);
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || "An error occurred");
        }
    };

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

            {/* Main Section */}
            <main className="flex-1 w-full max-w-7xl px-6 mt-6">
                {/* Compulsory exams section */}
                <section className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Compulsory Exams</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isExamsUnderMTLoading ? (
                            <Loader2 />
                        ) : (
                            compulsoryExams.length > 0 ? (
                                compulsoryExams.map((exam) => (
                                    <MTExamCard
                                        key={exam?.id}
                                        exam={exam}
                                        isSubscribed={isSubscribed}
                                        packageId={packageId}
                                        modelTestId={modelTestId}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No compulsory exams available</p>
                            )
                        )}
                    </div>
                </section>

                {/* optional exams section */}
                <section className="bg-white shadow rounded-lg p-6 mt-6">
                    <h2 className="text-xl font-semibold mb-4">Optional Exams</h2>
                    <p className="text-gray-600 text-sm mb-4">
                        Please choose any one optional exam to proceed with the model test.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isExamsUnderMTLoading ? (
                            <Loader2 />
                        ) : (
                            optionalExams.length > 0 ? (
                                optionalExams.map((exam) => (
                                    <MTExamCard
                                        key={exam?.id}
                                        exam={exam}
                                        isSubscribed={isSubscribed}
                                        packageId={packageId}
                                        modelTestId={modelTestId}
                                        selectedOptionalExams={selectedOptionalExams}
                                        setSelectedOptionalExams={setSelectedOptionalExams}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No optional exams available</p>
                            )
                        )}
                    </div>
                </section>
            </main>

            {/* Fixed Timer and Button Section */}
            {isExamsActive && isSubscribed && (
                <div className="fixed bottom-0 left-0 right-0 px-4 flex flex-col justify-center items-center gap-2 z-50">
                    <MTExamTimer startTime={startTime} endTime={endTime} />

                    <Button
                        onClick={handleFinishAllExams}
                        className="bg-red-500 hover:bg-red-600 text-white text-lg w-full"
                        disabled={isFinishingExam}
                    >
                        {isFinishingExam ? "Finishing..." : "Finish All Exams"}
                    </Button>
                </div>
            )}
        </div>
    );
};
