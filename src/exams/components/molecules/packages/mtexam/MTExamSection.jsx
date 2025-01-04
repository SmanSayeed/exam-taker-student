import { Loader2 } from "lucide-react";
import { MTExamCard } from "../MTExamCard";

export const MTExamSection = ({ title, exams, isLoading, description, isSubscribed, packageId, modelTestId, allExamsSubmitted }) => (
    <section className="bg-white shadow rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {description && <p className="text-gray-600 text-sm mb-4">{description}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                isLoading ? (
                    <Loader2 />
                ) : (
                    exams.length > 0 ? (
                        exams.map((exam) => (
                            <MTExamCard
                                key={exam?.id}
                                exam={exam}
                                isSubscribed={isSubscribed}
                                packageId={packageId}
                                modelTestId={modelTestId}
                            // allExamsSubmitted={allExamsSubmitted}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No exams available</p>
                    )
                )
            }
        </div>
    </section>
);
