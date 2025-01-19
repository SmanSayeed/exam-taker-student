import { Link } from "react-router-dom";

export const MTExamListForResult = ({ allExaminations, onSubmissionView, modelTestId }) => {
    if (!allExaminations || allExaminations.length === 0) {
        return <p className="text-gray-500">No examinations available.</p>;
    }

    return (
        <div className="space-y-4">
            {allExaminations.map((exam) => (
                <div
                    key={exam.examination_id}
                    className="p-4 border rounded-md shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4"
                >
                    <div>
                        <h3 className="text-md font-semibold">{exam.title}</h3>
                        <p>Type: {exam.type}</p>
                        <p>Marks Obtained: {exam.obtained_marks}</p>
                    </div>
                    <Link
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        to={`/model-test/${modelTestId}/mtexam-result/${exam?.examination_id}`}
                    >
                        View Submission
                    </Link>
                </div>
            ))}
        </div>
    );
};

