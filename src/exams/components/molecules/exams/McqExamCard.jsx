import { Card, CardTitle } from "@/components/ui/card";
import DOMPurify from "dompurify";
import { BookmarkPlus } from "lucide-react";
import { useState } from "react";

const parseHtmlContent = (htmlContent) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(htmlContent),
            }}
        />
    );
};

const McqExamCard = ({ queIndex, question, setMcqAnswers }) => {

    const { id: question_id, title, mcq_questions } = question || {};

    const [selectedOption, setSelectedOption] = useState(null);
    const [submittedOption, setSubmittedOption] = useState(null);

    const handleOptionClick = (optionId, index) => {
        const optionLetter = String.fromCharCode(65 + index); // Convert index to letter (e.g., 0 -> A, 1 -> B)

        setSelectedOption(optionId);

        setMcqAnswers((prevAnswers) => {
            const existingAnswerIndex = prevAnswers.findIndex(
                (answer) => answer.question_id === question_id
            );

            const newAnswer = {
                question_id: question_id,
                mcq_question_id: optionId,
                submitted_mcq_option: optionLetter
            };

            if (existingAnswerIndex !== -1) {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers[existingAnswerIndex] = newAnswer;
                return updatedAnswers;
            } else {
                return [...prevAnswers, newAnswer];
            }
        });

        setSubmittedOption(optionId);
    };

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

            <div className="grid grid-cols-2 gap-2">
                {
                    mcq_questions?.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(option?.id, index)}
                            className={`flex items-center justify-start rounded-md gap-y-2 shadow cursor-pointer p-2 
                            ${submittedOption === option?.id
                                    ? 'bg-green-100 border-green-500'
                                    : selectedOption === option?.id
                                        ? 'bg-blue-100'
                                        : ''
                                }`}
                        >
                            <div className="flex p-2 gap-2 cursor-pointer">
                                <p className="border rounded-full h-6 w-6 p-2 flex items-center justify-center">
                                    {index + 1}
                                </p>
                                <h1>{parseHtmlContent(option?.mcq_question_text)}</h1>
                            </div>
                        </div>
                    ))
                }
            </div>

        </Card>
    )
}

export default McqExamCard