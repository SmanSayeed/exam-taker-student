import { Button } from "@/components/ui/button";
import { hasActiveExams } from "@/exams/components/molecules/packages/mtexam/examHelpers";
import {
    useFinishAllMTExamMutation,
    useGetExamsUnderMTQuery,
    useGetSingleModelTestQuery,
    useGetSinglePackageQuery,
} from "@/features/packages/packagesApi";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { MTExamActions } from "@/exams/components/molecules/packages/mtexam/MTExamActions";
import { MTExamHeader } from "@/exams/components/molecules/packages/mtexam/MTExamHeader";
import { MTExamSection } from "@/exams/components/molecules/packages/mtexam/MTExamSection";

export const MTDetailsPage = () => {
    const { packageId, modelTestId } = useParams();

    const [isFullSubmitAlertOpen, setIsFullSubmitAlertOpen] = useState(false);
    const [allExamsSubmitted, setAllExamsSubmitted] = useState(false);

    const auth = useSelector((state) => state.auth);
    const { allMTExams } = useSelector(state => state.mtExam);

    const { data: singlePackage } = useGetSinglePackageQuery(packageId);
    const isSubscribed = singlePackage?.data?.is_subscribed;

    const { data: modelTestData } = useGetSingleModelTestQuery(modelTestId);
    const { data: examsUnderMT, isLoading: isExamsUnderMTLoading } = useGetExamsUnderMTQuery(modelTestId);

    const startTime = modelTestData?.data?.start_time;
    const endTime = modelTestData?.data?.end_time;
    const isExamsActive = hasActiveExams(startTime, endTime);

    const optionalExams = examsUnderMT?.data?.filter((exam) => exam?.is_optional === 1) || [];
    const compulsoryExams = examsUnderMT?.data?.filter((exam) => exam?.is_optional === 0) || [];

    const [finishAllMTExam, { isLoading: isFinishingExam }] = useFinishAllMTExamMutation();

    const submitAllMTExams = async (event) => {
        event.preventDefault();

        // Prepared payload for all exams
        const preparedPayload = allMTExams?.map(mtexam => {
            return {
                "examination_id": mtexam?.exam?.id,
                "student_id": auth.student.id,
                "type": mtexam?.exam?.type,
                "mcq_answers": mtexam?.mcqAnswers
            }
        });

        try {
            // Use Promise.all to submit all exams in parallel
            await Promise.all(
                preparedPayload.map(async (examPayload) => {
                    const response = await finishAllMTExam(examPayload).unwrap();
                    toast.success(response?.message || "All exams Submit successfully");

                    if (response.status_code === 200 && response.data) {
                        setAllExamsSubmitted(true);
                    }
                })
            );
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || "An error occurred");
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
                {/* Header Section */}
                <MTExamHeader
                    title={parseHtmlContent(modelTestData?.data?.title) || "Model Test Details"}
                />

                {/* Main Section */}
                <main className="flex-1 w-full max-w-7xl px-6 mt-6">
                    <MTExamSection
                        title="Compulsory Exams"
                        exams={compulsoryExams}
                        isLoading={isExamsUnderMTLoading}
                        isSubscribed={isSubscribed}
                        packageId={packageId}
                        modelTestId={modelTestId}
                        allExamsSubmitted={allExamsSubmitted}
                    />
                    <MTExamSection
                        title="Optional Exams"
                        exams={optionalExams}
                        isLoading={isExamsUnderMTLoading}
                        description="Please choose any one optional exam to proceed with the model test."
                        isSubscribed={isSubscribed}
                        packageId={packageId}
                        modelTestId={modelTestId}
                        allExamsSubmitted={allExamsSubmitted}
                    />
                </main>

                {/* Fixed Timer and Button Section */}
                {isSubscribed && (
                    <MTExamActions
                        isActive={isExamsActive}
                        startTime={startTime}
                        endTime={endTime}
                        isLoading={isFinishingExam}
                        onExamsSubmit={() => setIsFullSubmitAlertOpen(true)}
                        allExamsSubmitted={allExamsSubmitted}
                        modelTestId={modelTestId}
                    />
                )}
            </div >

            {/* Full Submission Confirmation Alert Dialog */}
            <AlertDialog AlertDialog open={isFullSubmitAlertOpen} onOpenChange={setIsFullSubmitAlertOpen} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to submit the exam?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button onClick={() => setIsFullSubmitAlertOpen(false)} variant="secondary">
                            Cancel
                        </Button>
                        <Button
                            onClick={(e) => {
                                submitAllMTExams(e);
                                setIsFullSubmitAlertOpen(false);
                            }}
                        >
                            Yes, Submit
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
        </>
    );
};
