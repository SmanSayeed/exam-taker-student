import { Card } from "@/components/ui/card";

export function NormalQuesForSubmissionView({ queIndex, question }) {
    const { title, student_answer } = question || {};
    const fileUrl = student_answer?.file_url;

    return (
        <Card className="p-4 relative group shadow-md my-3 hover:shadow-lg dark:bg-gray-100 dark:text-black duration-500">
            {/* View File Section */}
            {fileUrl && (
                <div className="mb-4">
                    <p className="text-sm font-medium">Submitted File:</p>
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                    >
                        View File
                    </a>
                </div>
            )}

            {/* Question Title */}
            <div className="mb-4 flex items-center gap-2">
                <p className="text-base font-medium">{queIndex + 1}. </p>
                <p className="text-base">{title}</p>
            </div>
        </Card>
    );
}
