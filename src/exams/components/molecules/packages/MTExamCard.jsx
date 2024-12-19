import { Button } from "@/components/ui/button";
import { calculateDuration, isoDateFormatter } from "@/helpers/dateFormatter";

export const MTExamCard = ({ exam, isSubscribed }) => {
    const duration = calculateDuration(exam?.start_time, exam?.end_time);

    // Calculate if the current time is within the exam start and end time
    const now = new Date();
    const isWithinExamTime = new Date(exam?.start_time) <= now && now <= new Date(exam?.end_time);

    return (
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-1">{exam?.name}</h3>
            <p className="text-gray-600 text-sm mb-1">
                {duration} · {exam?.questions} Questions
            </p>
            <p className="text-gray-500 text-sm">
                {isoDateFormatter(exam?.start_time)} to {isoDateFormatter(exam?.end_time)}
            </p>
            {
                isSubscribed && (
                    <div className="mt-2">
                        <Button
                            variant="outline"
                            disabled={!isWithinExamTime}
                        >
                            Start Exam
                        </Button>
                        {!isWithinExamTime && (
                            <p className="text-sm text-gray-500 mb-2">
                                The exam will start at {isoDateFormatter(exam?.start_time)}
                            </p>
                        )}
                        {isWithinExamTime && (
                            <p className="text-sm text-gray-500 mb-2">
                                The exam is currently active. Please start now.
                            </p>
                        )}
                    </div>
                )
            }
        </div>
    );
};
