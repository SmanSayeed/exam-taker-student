import { Card, CardTitle } from "@/components/ui/card";
import { updateMcqAnswer } from "@/exams/features/exams/examSlice";
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

const McqExamCardTest = ({ queIndex, question }) => {

    const { id: question_id, title, mcq_questions } = question || {};

    // Get the persisted answers from Redux
    const mcqAnswers = useSelector((state) => state.exam.mcqAnswers);

    // Find the persisted answer for the current question
    const persistedAnswer = mcqAnswers?.find((answer) => answer?.question_id === question_id);

    // Local state to track the selected option
    const [selectedOption, setSelectedOption] = useState(null);

    // When the component mounts, set the selected option based on persisted answer
    useEffect(() => {
        if (persistedAnswer && persistedAnswer?.submitted_mcq_option) {
            setSelectedOption(persistedAnswer?.submitted_mcq_option);
        }
    }, [persistedAnswer]);

    const dispatch = useDispatch();

    const handleOptionClick = (optionId, optionSerial) => {
        if (!optionSerial) {
            console.error("mcq_option_serial is missing for option ID:", optionId);
            return;
        }

        // Update the local state to show which option was selected
        // setSelectedOption(optionId);

        // Dispatch the action to update the Redux store
        dispatch(updateMcqAnswer({
            question_id,
            mcq_question_id: optionId,
            submitted_mcq_option: optionSerial
        }));
    };

    return (
        <Card className="p-4 relative group shadow-md my-3 hover:shadow-lg duration-500">
            <CardTitle>
                <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <p>{queIndex + 1}. </p>
                        <p className="text-left">{parseHtmlContent(title)} </p>
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
                                onClick={() => handleOptionClick(option?.id, option?.mcq_option_serial.toString())}
                                className="flex items-center justify-start rounded-md gap-y-2 shadow cursor-pointer p-2"
                            >
                                <div className="flex p-2 gap-2 cursor-pointer">
                                    <p className={`border ${selectedOption === option?.mcq_option_serial && selectedOption !== null && 'bg-green-600'} rounded-full h-6 w-6 p-2 flex items-center justify-center`}>
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

export default McqExamCardTest;