import { Pen } from "lucide-react";

export function PackageDetails({ description }) {
    // Dummy data for model tests
    const modelTests = [
        { id: 1, title: "Chemistry", paper: "2nd paper", image: "/modeltest-demo.jpg", testCount: 4, routine: "Routine for Chemistry 2nd Paper" },
        { id: 2, title: "Higher Math", paper: "1st paper", image: "/modeltest-demo.jpg", testCount: 3, routine: "Routine for Higher Math 1st Paper" },
        { id: 3, title: "Higher Math", paper: "2nd paper", image: "/modeltest-demo.jpg", testCount: 3, routine: "Routine for Higher Math 2nd Paper" },
        { id: 4, title: "Biology", paper: "1st paper", image: "/modeltest-demo.jpg", testCount: 3, routine: "Routine for Biology 1st Paper" },
        { id: 5, title: "Biology", paper: "2nd paper", image: "/modeltest-demo.jpg", testCount: 3, routine: "Routine for Biology 2nd Paper" },
    ];

    return (
        <div>
            {/* Package Description */}
            <p
                className="text-gray-600 text-lg leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: description }}
            />

            {/* Model Test List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    modelTests.map((test) => (
                        <div
                            key={test.id}
                            className="relative rounded-lg overflow-hidden shadow-md border"
                        >
                            <div>
                                {/* Model Test Image */}
                                <img
                                    src={test.image}
                                    alt={`${test.title} Thumbnail`}
                                    className="w-full h-full object-cover"
                                />

                                {/* Test Count */}
                                <div className="absolute bottom-11 right-2 bg-indigo-600 text-white text-sm px-2 py-1 rounded-lg flex gap-1 items-center">
                                    <Pen size={12} />
                                    {test.testCount}
                                </div>
                            </div>

                            {/* Routine Section */}
                            <div className="bg-gray-100 text-gray-700 text-center py-2">
                                {test.routine}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
