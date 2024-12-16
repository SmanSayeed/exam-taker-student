import { Card } from "@/components/ui/card";
import DOMPurify from "dompurify";
import { BookmarkPlus } from "lucide-react";
import { useSelector } from "react-redux";

const parseHtmlContent = (htmlContent) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(htmlContent),
            }}
        />
    );
};

const parseHtmlContentWithBadge = (htmlContent, badgeText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Find the first element with text content
    const firstTextElement = Array.from(doc.body.getElementsByTagName("*")).find(el => el.textContent.trim());

    if (firstTextElement) {
        // Create a span for the badge element
        const badgeElement = document.createElement("span");
        badgeElement.className = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 ml-2";
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

export const ExamResultForMcqCard = ({ queIndex, question }) => {

    const { id: question_id, title, mcq_questions, images } = question || {};

    const submittedExam = useSelector(state => state.submittedExam);
    const { mcq_answers } = submittedExam;

    const submittedAnswer = mcq_answers.find(item => item?.question_id === question_id);
    const submittedMcqOption = submittedAnswer?.submitted_mcq_option;
    const isSkipped = submittedAnswer?.submitted_mcq_option === null;

    return (
        <Card className="p-4 relative group shadow-md my-3 hover:shadow-lg duration-500">
            {/* question title */}
            <div className="mb-4 flex items-center justify-between gap-2 ">
                <div className="flex gap-2">
                    <p className="text-base">{queIndex + 1}. </p>
                    <p className="text-left text-base">
                        {isSkipped ? parseHtmlContentWithBadge(title, "Skipped") : parseHtmlContent(title)}
                    </p>
                </div>
                <div>
                    <BookmarkPlus size={20} className="cursor-pointer" />
                </div>
            </div>

            {/* Render the image if available */}
            {images && (
                <div className="my-4">
                    <img
                        src={images}
                        alt={`Image for question ${question_id}`}
                        className="rounded-md shadow-md max-w-full"
                    />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {
                    mcq_questions?.map((option, index) => {
                        const isCorrect = option?.is_correct;
                        const isSubmitted = option?.mcq_option_serial === submittedMcqOption;

                        let bgColor = "";

                        // Logic for background color
                        if (isSubmitted && isCorrect) {
                            // If the submitted answer is correct
                            bgColor = "bg-green-300 text-green-900";
                        } else if (isSubmitted && !isCorrect) {
                            // If the submitted answer is incorrect
                            bgColor = "bg-red-600 text-white";
                        } else if (isCorrect) {
                            // For the correct answer, even if not selected
                            bgColor = "bg-green-300 text-green-900";
                        }

                        return (
                            <div
                                key={index}
                                className={`flex items-center justify-start rounded-md gap-y-2 shadow cursor-pointer p-2 ${bgColor}`}
                            >
                                <div className="flex p-2 gap-2 cursor-pointer">
                                    <p className="border rounded-full h-6 w-6 p-2 flex items-center justify-center text-sm">
                                        {index + 1}
                                    </p>
                                    <h1 className="text-sm">{parseHtmlContent(option?.mcq_question_text)}</h1>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </Card>
    )
}