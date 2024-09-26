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
    // console.log("mcq_question", mcq_questions)

    const [selectedOption, setSelectedOption] = useState(null);
    const [submittedOption, setSubmittedOption] = useState(null);

    const handleOptionClick = (optionId, index, optionSerial) => {
        // const serial = optionSerial || "N/A"; // Provide a default value if missing
        // console.log("mcq_option_serial:", serial);

        if (!optionSerial) {
            console.error("mcq_option_serial is missing for option ID:", optionId);
            return;
        }

        setSelectedOption(optionId);

        setMcqAnswers((prevAnswers) => {
            const existingAnswerIndex = prevAnswers.findIndex(
                (answer) => answer.question_id === question_id
            );

            const newAnswer = {
                question_id: question_id,
                mcq_question_id: optionId,
                submitted_mcq_option: optionSerial
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {
                    mcq_questions?.map((option, index) => {
                        // console.log("Option", index + 1, "data:", option);
                        return (
                            <div
                                key={index}
                                onClick={() => handleOptionClick(option?.id, index, option?.mcq_option_serial)}
                                // className={`flex items-center justify-start rounded-md gap-y-2 shadow cursor-pointer p-2 ${submittedOption === option?.id ? 'bg-green-100 border-green-500'
                                //     : selectedOption === option?.id
                                //         ? 'bg-blue-100'
                                //         : ''}`}
                                className="flex items-center justify-start rounded-md gap-y-2 shadow cursor-pointer p-2"
                            >
                                <div className="flex p-2 gap-2 cursor-pointer">
                                    <p className={`border ${selectedOption === option?.id && 'bg-green-600'} rounded-full h-6 w-6 p-2 flex items-center justify-center`}>
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

export default McqExamCard