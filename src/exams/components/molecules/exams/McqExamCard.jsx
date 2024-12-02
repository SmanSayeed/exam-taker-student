import { Card, CardTitle } from "@/components/ui/card";
import { updateMcqAnswer } from "@/features/exams/examSlice";
import DOMPurify from "dompurify";
import { BookmarkPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const parseHtmlContent = (htmlContent) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(htmlContent),
            }}
        />
    );
};

export default function McqExamCard({ queIndex, question }) {
    const dispatch = useDispatch();
    const mcqAnswers = useSelector((state) => state.exam.mcqAnswers);

    const { id: question_id, title, mcq_questions } = question || {};

    const persistedAnswer = mcqAnswers?.find((answer) => answer?.question_id === question_id);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (persistedAnswer && persistedAnswer?.submitted_mcq_option) {
            setSelectedOption(persistedAnswer?.submitted_mcq_option);
        }
    }, [persistedAnswer]);

    const handleOptionClick = (optionId, optionSerial) => {
        if (!optionSerial) {
            console.error("mcq_option_serial is missing for option ID:", optionId);
            return;
        }

        dispatch(updateMcqAnswer({
            question_id,
            mcq_question_id: optionId,
            submitted_mcq_option: optionSerial
        }));
    };

    return (
        <Card className="p-4 relative group shadow-md my-3 hover:shadow-lg dark:bg-gray-100 dark:text-black duration-500">
            <CardTitle>
                <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex gap-2">
                        <p className="text-base">{queIndex + 1}. </p>
                        <p className="text-left text-base">{parseHtmlContent(title)} </p>
                    </div>
                    <div>
                        <BookmarkPlus size={20} className="cursor-pointer" />
                    </div>
                </div>
            </CardTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {
                    mcq_questions?.map((option, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => handleOptionClick(option?.id, option?.mcq_option_serial)}
                                className="flex items-center justify-start rounded-md gap-y-2 shadow cursor-pointer p-2"
                            >
                                <div className="flex p-2 gap-2 cursor-pointer">
                                    <p className={`border ${selectedOption === option?.mcq_option_serial && selectedOption !== null && 'bg-gray-800 text-gray-200'} rounded-full h-6 w-6 p-2 flex items-center justify-center text-sm`}>
                                        {index + 1}
                                    </p>
                                    <h1 className="text-sm">{parseHtmlContent(option?.mcq_question_text)}</h1>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </Card >
    )
}