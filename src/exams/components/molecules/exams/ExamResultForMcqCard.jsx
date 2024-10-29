import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
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

export const ExamResultForMcqCard = ({ queIndex, question }) => {

    const { id: question_id, title, mcq_questions } = question || {};

    const submittedExam = useSelector(state => state.submittedExam);
    const { mcq_answers } = submittedExam;

    const submittedAnswer = mcq_answers.find(item => item?.question_id === question_id);
    const submittedMcqOption = submittedAnswer?.submitted_mcq_option;
    const isSkipped = submittedAnswer?.submitted_mcq_option === null;

    return (
        <Card className="p-4 relative group shadow-md my-3 hover:shadow-lg duration-500">
            <CardTitle>
                <div className="mb-4 flex items-center justify-between gap-2 ">
                    <div className="flex items-center justify-center gap-2">
                        <p className="text-base">{queIndex + 1}. </p>
                        <p className="text-left text-base">{parseHtmlContent(title)} </p>
                        <span>{isSkipped && (<Badge>Skipped</Badge>)}</span>
                    </div>
                    <div>
                        <BookmarkPlus size={20} className="cursor-pointer" />
                    </div>
                </div>
            </CardTitle>

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