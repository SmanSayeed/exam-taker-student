import { Button } from "@/components/ui/button";
import { useStartExamMutation } from "@/features/exams/examsApi";
import { calculateDuration, isoDateFormatter } from "@/helpers/dateFormatter";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const MTExamCard = ({ exam, isSubscribed, packageId, modelTestId }) => {
    console.log("exam", exam);

    const navigate = useNavigate();
    const duration = calculateDuration(exam?.start_time, exam?.end_time);

    const questionsArray = exam?.questions?.split(",") || [];
    const questionCount = questionsArray.length || 0;

    const now = new Date();
    const isWithinExamTime = new Date(exam?.start_time) <= now && now <= new Date(exam?.end_time);
    const isExamEnded = new Date(exam?.end_time) < now;
    const isExamNotStarted = now < new Date(exam?.start_time);

    const auth = useSelector((state) => state.auth);
    const [startMTExam] = useStartExamMutation();

    const handleExamStart = async (event) => {
        event.preventDefault();

        const payload = {
            is_second_time: false,
            student_id: auth.student.id,
            exam_id: exam?.id,
        };

        try {
            const response = await startMTExam(payload).unwrap();
            console.log("response", response);

            navigate(`/package/${packageId}/model-test/${modelTestId}/exam-ongoing/${exam?.id}`);
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">{exam?.title}</h3>
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
            <p className="text-gray-600 text-sm">
                <span className="font-semibold">Duration:</span> {duration} ·{" "}
                <span className="font-semibold">Questions:</span> {questionCount}
            </p>
            <p className="text-gray-500 text-sm">
                <span className="font-semibold">Time:</span> {isoDateFormatter(exam?.start_time)}{" "}
                to {isoDateFormatter(exam?.end_time)}
            </p>
            {isSubscribed && (
                <>
                    {isWithinExamTime && (
                        <div>
                            {/* start exam button */}
                            <Button
                                onClick={handleExamStart}
                                className="w-full" disabled={!isWithinExamTime}
                            >
                                Start Exam
                            </Button>

                            <p className="text-sm text-gray-500 mt-2">
                                The exam is currently active. Click the button to begin.
                            </p>
                        </div>
                    )}
                    {isExamNotStarted && (
                        <p className="text-sm text-yellow-600">
                            The exam will start at <strong>{isoDateFormatter(exam?.start_time)}</strong>.
                        </p>
                    )}
                    {isExamEnded && (
                        <p className="text-sm text-red-600">
                            The exam ended on <strong>{isoDateFormatter(exam?.end_time)}</strong>.
                        </p>
                    )}
                </>
            )}
            {!isSubscribed && (
                <p className="text-sm text-blue-600">
                    Subscribe to access this exam.
                </p>
            )}
        </div>
    );
};

