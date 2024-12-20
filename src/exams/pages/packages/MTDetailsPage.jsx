import { MTExamCard } from "@/exams/components/molecules/packages/MTExamCard";
import { useGetSinglePackageQuery } from "@/features/packages/packagesApi";
import { Link, useParams } from "react-router-dom";

// Mock data for exams
const exams = [
    {
        id: 1,
        name: "Engineering weekly-1 (MCQ)",
        duration: "45 Minutes",
        questions: 50,
        start_time: "2024-06-01T10:00:00",
        end_time: "2024-06-01T12:00:00"
    },
    {
        id: 2,
        name: "Math Weekly Test",
        duration: "1 Hour",
        questions: 40,
        start_time: "2024-06-01T10:00:00",
        end_time: "2024-06-01T12:00:00"
    },
    {
        id: 3,
        name: "Science Challenge",
        duration: "30 Minutes",
        questions: 20,
        start_time: "2024-06-01T10:00:00",
        end_time: "2024-06-01T12:00:00"
    },
];

export const MTDetailsPage = () => {
    const { packageId, modelTestId } = useParams();
    const { data: singlePackage } = useGetSinglePackageQuery(packageId);
    // const isSubscribed = singlePackage?.is_subscribed;
    const isSubscribed = true;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            {/* Header Section */}
            <header className="bg-white shadow w-full px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Model Test Title</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl px-6 mt-6">
                <section className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Available Exams</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exams.map((exam) => (
                            <MTExamCard
                                key={exam?.id}
                                exam={exam}
                                isSubscribed={isSubscribed}
                                packageId={packageId}
                                modelTestId={modelTestId}
                            />
                        ))}
                        {!isSubscribed && (
                            <div className="mt-2">
                                <p className="text-red-500 text-sm">
                                    Please enroll to attend the exam!
                                </p>
                                <Link
                                    to={`/package/${packageId}`}
                                    className="text-blue-500 underline text-sm hover:text-blue-600"
                                >
                                    Click here
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

