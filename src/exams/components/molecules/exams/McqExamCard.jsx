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

const McqExamCard = ({ queIndex, question }) => {

    const { id: question_id, title, mcq_questions } = question || {};

    const [selectedOption, setSelectedOption] = useState(null);
    const [submittedOption, setSubmittedOption] = useState(null);
    // const [isSubmitting, setIsSubmitting] = useState(false);

    console.log("selectedOption", selectedOption)

    const handleOptionClick = (index) => {
        setSelectedOption(index);
    };

    // Handle submission of the selected answer
    // const handleSubmit = () => {
    //     if (selectedOption === null || isSubmitting) return; // Don't submit if nothing is selected or already submitting

    //     const selectedMcqQuestion = mcq_questions[selectedOption];
    //     const payload = {
    //         mcq_answers: [
    //             {
    //                 question_id,
    //                 mcq_question_id: selectedMcqQuestion.id,
    //                 submitted_mcq_option: selectedMcqQuestion.option_label, // e.g., "A", "B"
    //             },
    //         ],
    //     };

    //     setIsSubmitting(true); // Start submission
    //     axios.post("/api/submit-answer", payload)
    //         .then(() => {
    //             setSubmittedOption(selectedOption); // Set the submitted option after successful submission
    //         })
    //         .finally(() => {
    //             setIsSubmitting(false); // Reset submission state
    //         });
    // };

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
                            onClick={() => handleOptionClick(index)}
                            className={`flex items-center justify-start rounded-md gap-y-2 shadow cursor-pointer p-2 
                            ${submittedOption === index
                                    ? 'bg-green-100 border-green-500'
                                    : selectedOption === index
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

            {/* <button
                onClick={handleSubmit}
                className={`mt-4 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 duration-300 
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable button while submitting
                disabled={isSubmitting || selectedOption === null} // Disable if no option is selected
            >
                {isSubmitting ? 'Submitting...' : 'Submit Answer'}
            </button> */}
        </Card>
    )
}

export default McqExamCard