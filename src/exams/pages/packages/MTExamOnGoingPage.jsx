import { Card, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { McqExamCardForMT } from "@/exams/components/molecules/packages/mtexam/McqExamCardForMT";
import { MTExamTimer } from "@/exams/components/molecules/packages/mtexam/MTExamTimer";
import { useFinishExamMutation } from "@/features/exams/examsApi";
import { useGetSingleModelTestQuery } from "@/features/packages/packagesApi";
import { calculateDuration } from "@/helpers/dateFormatter";

export default function MTExamOnGoingPage() {
    const navigate = useNavigate();

    const mtExam = useSelector(state => state.mtExam);
    const { mtExam: mtExamData, questions_list, mcqAnswers } = mtExam;

    const { modelTestId } = useParams();
    const { data: modelTestData } = useGetSingleModelTestQuery(modelTestId);
    const startTime = modelTestData?.data?.start_time;
    const endTime = modelTestData?.data?.end_time;
    const duration = calculateDuration(startTime, endTime);

    const questionType = mtExamData.type;

    // const [isAlertOpen, setIsAlertOpen] = useState(false);
    // const [isFullSubmitAlertOpen, setIsFullSubmitAlertOpen] = useState(false);

    const [finishExam, { isLoading: isExamFinishing }] = useFinishExamMutation();

    const handleSubmit = () => {
        const skippedQuestions = mcqAnswers?.filter(answer => answer.submitted_mcq_option === null);

        if (skippedQuestions?.length > 0) {
            setIsAlertOpen(true);
        } else {
            setIsFullSubmitAlertOpen(true);
        }
    };

    const submitExam = async () => {
        const payload = {
            "examination_id": examData.id,
            "student_id": examData.created_by,
            "type": questionType,
            "mcq_answers": mcqAnswers,
            // "creative_answers": [
            //   {
            //     "question_id": 20,
            //     "creative_question_id": 201,
            //     "creative_question_option": "Option A",
            //     "creative_question_text": "This is the creative answer text."
            //   }
            // ],
            // "normal_answers": [
            //   {
            //     "question_id": 30,
            //     "normal_answer_text": "This is a normal answer text."
            //   }
            // ]
        };

        try {
            const response = await finishExam(payload).unwrap();

            if (response.examination && response.mcq_answers) {
                navigate("/exam-result");
            }
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="px-5 w-full">
                <Card className="text-center p-4 relative mt-2">
                    <CardTitle> {mtExamData?.title} </CardTitle>
                    <p className="mt-3" >Time: {duration} minutes </p>

                    <p>{questions_list[0]?.mark} mark per question and 0.25 marks will be deducted for each mistake</p>
                </Card>

                <div className="text-center">
                    {questionType === "mcq" && (
                        questions_list.map((question, index) => (
                            <McqExamCardForMT
                                key={question?.id}
                                queIndex={index}
                                question={question}
                            />
                        ))
                    )}

                    {/* <Button
                    id="exam_submit"
                    onClick={handleSubmit}
                    className="w-full"
                    disabled={isExamFinishing}
                >
                    {
                        isExamFinishing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : "Submit"
                    }
                </Button> */}
                </div>

                {/* Skipped Questions Alert Dialog */}
                {/* <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Skipped Questions</AlertDialogTitle>
                        <AlertDialogDescription>
                            You have skipped some questions. Are you sure you want to submit the exam?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button onClick={() => setIsAlertOpen(false)} variant="secondary">
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            setIsAlertOpen(false);
                            submitExam();
                        }}>
                            Yes, Submit
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}

                {/* Full Submission Confirmation Alert Dialog */}
                {/* <AlertDialog open={isFullSubmitAlertOpen} onOpenChange={setIsFullSubmitAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
                        <AlertDialogDescription>
                            You have answered all the questions. Are you sure you want to submit the exam?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button onClick={() => setIsFullSubmitAlertOpen(false)} variant="secondary">
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            setIsFullSubmitAlertOpen(false);
                            submitExam();
                        }}>
                            Yes, Submit
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}
            </div>

            {/* mtexam timer */}
            <div
                className="fixed bottom-0 left-0 right-0 px-4 flex flex-col justify-center items-center gap-2 z-50"
            >
                <MTExamTimer
                    startTime={startTime}
                    endTime={endTime}
                />
            </div>
        </>
    )
}