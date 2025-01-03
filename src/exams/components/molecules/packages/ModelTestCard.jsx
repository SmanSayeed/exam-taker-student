import { Badge } from "@/components/ui/badge";
import { calculateDuration, isoDateFormatter } from "@/helpers/dateFormatter";
import { Pen } from "lucide-react";
import { Link } from "react-router-dom";

export const ModelTestCard = ({ singleMT, isSubscribed, packageId }) => {
    const duration = calculateDuration(singleMT.start_time, singleMT.end_time);

    return (
        <Link
            to={`/package/${packageId}/model-test/${singleMT?.id}`}
            className="rounded-lg overflow-hidden shadow-md border relative"
        >
            <div className="relative">
                {/* Model Test Image */}
                {
                    singleMT?.img ? (
                        <div className="h-48 w-full">
                            <img
                                src={singleMT?.img}
                                alt="Thumbnail"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="bg-gray-200 h-48 w-full rounded-t-md flex items-center justify-center">
                            <p className="text-gray-500">No Image Available</p>
                        </div>
                    )
                }

                {/* Test Count */}
                <div className="absolute bottom-2 right-2 bg-indigo-600 text-white text-sm px-2 py-1 rounded-lg flex gap-1 items-center">
                    <Pen size={12} />
                    {singleMT?.testCount}
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
                        <span className="text-indigo-600">{isoDateFormatter(singleMT?.start_time)}</span>
                    </div>

                    <div className="h-8 w-px bg-gray-300"></div>

                    <div className="flex flex-col items-center">
                        <span className="font-medium text-gray-800 mb-1">End</span>
                        <span className="text-red-600">{isoDateFormatter(singleMT?.end_time)}</span>
                    </div>
                </div>
            </div>

            {isSubscribed && (
                <Badge variant="green" className="absolute top-1 right-1">
                    Subscribed
                </Badge>
            )}
        </Link>
    )
}