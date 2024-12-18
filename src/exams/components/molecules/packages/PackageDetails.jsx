import ModelTestCard from "./ModelTestCard";

// Dummy data for model tests
const modelTests = [
    {
        id: 1,
        title: "Chemistry",
        paper: "2nd paper",
        image: "/modeltest-demo.jpg",
        testCount: 4,
        routine: "Routine for Chemistry 2nd Paper",
        start_time: "2024-06-01T10:00:00",
        end_time: "2024-06-01T12:00:00"
    },
    {
        id: 2,
        title: "Higher Math",
        paper: "1st paper",
        image: "/modeltest-demo.jpg",
        testCount: 3,
        routine: "Routine for Higher Math 1st Paper",
        start_time: "2024-06-02T09:00:00",
        end_time: "2024-06-02T11:00:00"
    },
    {
        id: 3,
        title: "Higher Math",
        paper: "2nd paper",
        image: "/modeltest-demo.jpg",
        testCount: 3,
        routine: "Routine for Higher Math 2nd Paper",
        start_time: "2024-06-03T13:00:00",
        end_time: "2024-06-03T15:00:00"
    },
    {
        id: 4,
        title: "Biology",
        paper: "1st paper",
        image: "/modeltest-demo.jpg",
        testCount: 3,
        routine: "Routine for Biology 1st Paper",
        start_time: "2024-06-04T10:00:00",
        end_time: "2024-06-04T12:00:00"
    },
    {
        id: 5,
        title: "Biology",
        paper: "2nd paper",
        image: "/modeltest-demo.jpg",
        testCount: 3,
        routine: "Routine for Biology 2nd Paper",
        start_time: "2024-06-05T14:00:00",
        end_time: "2024-06-05T16:00:00"
    },
];

export function PackageDetails({ singlePackage }) {
    console.log("single package", singlePackage)

    const isSubscribed = false;
    // const isSubscribed = singlePackage?.is_subscribed;

    return (
        <div>
            {/* Package Description */}
            <p
                className="text-gray-600 text-lg leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: singlePackage.description }}
            />

            {/* Model Test List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {modelTests.map((test) => (
                    <ModelTestCard
                        key={test.id}
                        test={test}
                        isSubscribed={isSubscribed}
                        packageId={singlePackage?.id}
                    />
                ))}
            </div>

            {/* Conditional Rendering for Exam Access */}
            {isSubscribed ? (
                <div className="mt-6 text-center text-green-600 font-semibold">
                    You have access to the exam list for this package.
                </div>
            ) : (
                <div className="mt-6 text-center text-red-600 font-semibold">
                    Subscribe to access the exams for this package.
                </div>
            )}
        </div>
    );
}

