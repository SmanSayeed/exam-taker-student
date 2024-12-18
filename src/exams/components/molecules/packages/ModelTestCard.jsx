import { calculateDuration, isoDateFormatter } from "@/helpers/dateFormatter";
import { Pen } from "lucide-react";
import { Link } from "react-router-dom";

export const ModelTestCard = ({ test, isSubscribed, packageId }) => {
    const duration = calculateDuration(test.start_time, test.end_time);

    return (
        <Link
            to={`/package/${packageId}/model-test/${test?.id}`}
            className="rounded-lg overflow-hidden shadow-md border"
        >
            <div className="relative">
                {/* Model Test Image */}
                <img
                    src={test.image}
                    alt={`${test.title} Thumbnail`}
                    className="w-full h-full object-cover"
                />

                {/* Test Count */}
                <div className="absolute bottom-2 right-2 bg-indigo-600 text-white text-sm px-2 py-1 rounded-lg flex gap-1 items-center">
                    <Pen size={12} />
                    {test.testCount}
                </div>
            </div>

            {/* Routine Section */}
            <div className="bg-indigo-50 text-gray-700 text-center py-3 px-4 rounded-b-lg shadow-inner">
                <div className="text-lg font-semibold text-indigo-700 mb-2">
                    {duration}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600">
                    {/* Start Time Column */}
                    <div className="flex flex-col items-center">
                        <span className="font-medium text-gray-800 mb-1">Start</span>
                        <span className="text-indigo-600">{isoDateFormatter(test.start_time)}</span>
                    </div>

                    <div className="h-8 w-px bg-gray-300"></div>

                    <div className="flex flex-col items-center">
                        <span className="font-medium text-gray-800 mb-1">End</span>
                        <span className="text-red-600">{isoDateFormatter(test.end_time)}</span>
                    </div>
                </div>
            </div>

            {/* Exam List Card - Render only if subscribed */}
            {isSubscribed && (
                <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                    Subscribed - Access Granted
                </div>
            )}
        </Link>
    )
}