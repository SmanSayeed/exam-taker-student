import { calculateDuration, isoDateFormatter } from "@/helpers/dateFormatter";

export const MTExamCard = ({ exam, isSubscribed }) => {
    const duration = calculateDuration(exam?.start_time, exam?.end_time);

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
                    <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600">
                        Start Exam
                    </button>
                )
            }
        </div>
    );
};
