import { Button } from "@/components/ui/button";
import { saveMTExamInfo, switchActiveExam } from "@/features/packages/mtExamSlice";
import { useGetSingleModelTestQuery, useStartMTExamMutation } from "@/features/packages/packagesApi";
import { calculateDuration, isoDateFormatter } from "@/helpers/dateFormatter";
import { ArrowRightCircleIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoaderSubmit } from "../../atoms/LoaderSubmit";
import { hasActiveExams } from "./mtexam/examHelpers";


export const MTExamCard = ({ exam, isSubscribed, packageId, modelTestId, selectedOptionalExams, setSelectedOptionalExams }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allMTExams = useSelector((state) => state.mtExam.allMTExams);

    const questionsArray = exam?.questions?.split(",") || [];
    const questionCount = questionsArray.length || 0;

    const { data: modelTestData } = useGetSingleModelTestQuery(modelTestId);
    const startTime = modelTestData?.data?.start_time;
    const endTime = modelTestData?.data?.end_time;
    const duration = calculateDuration(startTime, endTime);

    const now = new Date();
    const isExamsActive = hasActiveExams(startTime, endTime);
    const isExamEnded = new Date(endTime) < now;
    const isExamNotStarted = now < new Date(startTime);

    const auth = useSelector((state) => state.auth);
    const [startMTExam, { isLoading: isExamStarting }] = useStartMTExamMutation();

    // Check if the exam is already started
    const existingExam = allMTExams.find((item) => item.exam.id === exam?.id);

    const handleExamStart = async (event) => {
        event.preventDefault();

        const payload = {
            is_second_time: false,
            student_id: auth.student.id,
            exam_id: exam?.id,
        };

        try {
            const response = await startMTExam(payload).unwrap();

            dispatch(saveMTExamInfo(response?.data));
            navigate(`/package/${packageId}/model-test/${modelTestId}/exam-ongoing/${exam?.id}`);
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || "An error occurred");
        }
    };

    const handleSwitchExam = (event) => {
        event.preventDefault();

        dispatch(switchActiveExam(existingExam));
        navigate(`/package/${packageId}/model-test/${modelTestId}/exam-ongoing/${exam?.id}`);
    };

    const isOptionalExam = exam?.is_optional === 1;
    const ischeckedOptionalExam = selectedOptionalExams?.length > 0 ? selectedOptionalExams.includes(exam?.id) : false;
    const isDisabledOptionalExam = isOptionalExam && !ischeckedOptionalExam;

    const handleOptionalExamSelection = (event) => {
        const { checked } = event.target;

        if (checked) {
            // Replace the currently selected exam with the new one
            setSelectedOptionalExams([exam?.id]);
        } else {
            // Clear the selection if unchecked
            setSelectedOptionalExams([]);
        }
    };

    return (
        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
                {
                    isOptionalExam && (
                        <label className="flex items-center gap-2 text-blue-600 cursor-pointer">
                            <input
                                type="checkbox"
                                onChange={handleOptionalExamSelection}
                                checked={ischeckedOptionalExam}
                                className="h-4 w-4"
                            />
                            Select as Optional Exam
                        </label>
                    )
                }
                <span
                    className={`text-sm font-medium px-2 py-1 rounded ${isExamEnded
                        ? "bg-red-100 text-red-600"
                        : isExamNotStarted
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                >
                    {isExamEnded
                        ? "Ended"
                        : isExamNotStarted
                            ? "Not Started"
                            : "Active"}
                </span>
            </div>

            <h3 className="text-xl font-bold text-gray-800">{exam?.title}</h3>
            <p className="text-gray-600 text-sm">
                <span className="font-semibold">Duration:</span> {duration} ·{" "}
                <span className="font-semibold">Questions:</span> {questionCount}
            </p>
            <p className="text-gray-500 text-sm">
                <span className="font-semibold">Time:</span> {isoDateFormatter(startTime)}{" "}
                to {isoDateFormatter(endTime)}
            </p>

            {/* Exam Action Buttons */}
            {
                isSubscribed ? (
                    <>
                        {
                            isExamsActive && (
                                <div>
                                    {
                                        existingExam ? (
                                            <Button
                                                variant="outline"
                                                onClick={handleSwitchExam}
                                                className="flex gap-2 text-blue-600"
                                            >
                                                Go to {exam?.title} Page <ArrowRightCircleIcon />
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={handleExamStart}
                                                className="w-full"
                                                disabled={isExamStarting || isDisabledOptionalExam}
                                            >
                                                {
                                                    isExamStarting ? (
                                                        <LoaderSubmit />
                                                    ) : "Start Exam"
                                                }
                                            </Button>
                                        )
                                    }

                                    <p className="text-sm text-gray-500 mt-2">
                                        The exam is currently active. Click the button to begin.
                                    </p>
                                </div>
                            )
                        }
                        {
                            isExamNotStarted && (
                                <p className="text-sm text-yellow-600">
                                    The exam will start at <strong>{isoDateFormatter(startTime)}</strong>.
                                </p>
                            )
                        }
                        {
                            isExamEnded && (
                                <p className="text-sm text-red-600">
                                    The exam ended on <strong>{isoDateFormatter(endTime)}</strong>.
                                </p>
                            )
                        }
                    </>
                ) : (
                    <p className="text-sm text-blue-600">
                        Subscribe to access this exam.
                    </p>
                )
            }
        </div>
    );
};


