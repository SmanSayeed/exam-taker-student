import { Card } from "@/components/ui/card";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import DOMPurify from "dompurify";

export const McqQuesForSubmissionView = ({ question, queIndex }) => {
    const { title, mcq_options, student_answer } = question || {};

    return (
        <Card className="p-4 relative group shadow-md my-3 hover:shadow-lg duration-500">
            {/* Question title */}
            <div className="mb-4 flex items-center justify-between gap-2">
                <div className="flex gap-2">
                    <p className="text-base">{queIndex + 1}. </p>
                    <p className="text-left text-base">
                        {student_answer?.is_submitted_correct === false
                            ? parseHtmlContentWithBadge(title, "Skipped")
                            : parseHtmlContent(title)}
                    </p>
                </div>
            </div>

            {/* MCQ Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {mcq_options?.map((option, index) => {
                    const isCorrect = option?.id === student_answer?.correct_option_id;
                    const isSubmitted = option?.id === student_answer?.mcq_question_id;

                    let bgColor = "";

                    // Background color logic
                    if (isSubmitted && isCorrect) {
                        bgColor = "bg-green-300 text-green-900"; // Correct submitted
                    } else if (isSubmitted && !isCorrect) {
                        bgColor = "bg-red-600 text-white"; // Incorrect submitted
                    } else if (isCorrect) {
                        bgColor = "bg-green-300 text-green-900"; // Correct but not submitted
                    }

                    return (
                        <div
                            key={option.id}
                            className={`flex items-center justify-start rounded-md gap-y-2 shadow p-2 ${bgColor}`}
                        >
                            <div className="flex p-2 gap-2">
                                <p className="border rounded-full h-6 w-6 flex items-center justify-center text-sm">
                                    {option.mcq_option_serial}
                                </p>
                                <h1 className="text-sm">{parseHtmlContent(option?.mcq_question_text)}</h1>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

const parseHtmlContentWithBadge = (htmlContent, badgeText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Find the first element with text content
    const firstTextElement = Array.from(doc.body.getElementsByTagName("*")).find(
        (el) => el.textContent.trim()
    );

    if (firstTextElement) {
        // Create a span for the badge element
        const badgeElement = document.createElement("span");
        badgeElement.className =
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 ml-2";
        badgeElement.textContent = badgeText;

        // Append the badge after the text content in the found element
        firstTextElement.appendChild(badgeElement);
    }

    return (
        <span
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(doc.body.innerHTML),
            }}
        />
    );
};
