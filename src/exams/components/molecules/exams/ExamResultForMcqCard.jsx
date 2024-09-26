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
    // console.log("mcq_question", mcq_questions)

    const submittedExam = useSelector(state => state.submittedExam);
    const { mcq_answers } = submittedExam;

    const submittedAnswer = mcq_answers.find(item => item?.question_id === question_id);
    const submittedMcqOption = submittedAnswer?.submitted_mcq_option;
    const isSubmittedAnsCorrect = submittedAnswer?.is_correct;

    return (
        <Card className="p-4 relative group shadow-md my-3 hover:shadow-lg duration-500">
            <CardTitle>
                <div className="mb-4 flex items-center justify-between gap-2 ">
                    <div className="flex items-center gap-2">
                        <p>{queIndex + 1}. </p>
                        <p>{parseHtmlContent(title)} </p>
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
                        if (isSubmittedAnsCorrect) {
                            bgColor = 'bg-green-600';
                        } else if (submittedMcqOption && !isSubmittedAnsCorrect) {
                            bgColor = 'bg-red-600';
                        } else {
                            bgColor = 'bg-gray-100';
                        }

                        return (
                            <div
                                key={index}
                                // className={`flex items-center justify-start rounded-md gap-y-2 shadow cursor-pointer p-2 ${option?.is_correct || isSubmittedAnsCorrect ? 'bg-green-100 border-green-500' : "bg-red-400"}`}
                                // className={`flex items-center justify-start rounded-md gap-y-2 shadow cursor-pointer p-2 ${bgColor}`}
                                className="flex items-center justify-start rounded-md gap-y-2 shadow cursor-pointer p-2"
                            >
                                <div className="flex p-2 gap-2 cursor-pointer">
                                    <p className={`border ${bgColor} rounded-full h-6 w-6 p-2 flex items-center justify-center`}>
                                        {index + 1}
                                    </p>
                                    <h1>{parseHtmlContent(option?.mcq_question_text)}</h1>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </Card>
    )
}