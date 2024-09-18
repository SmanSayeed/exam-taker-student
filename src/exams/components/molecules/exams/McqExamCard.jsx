import { Card, CardTitle } from "@/components/ui/card";
import DOMPurify from "dompurify";
import { BookmarkPlus } from "lucide-react";

const McqExamCard = ({ queIndex, question }) => {

    const { title, mcq_questions } = question || {};

    const parseHtmlContent = (htmlContent) => {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(htmlContent),
                }}
            />
        );
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
                    mcq_questions?.map((option, index) => <div key={index} className="flex items-center justify-start rounded-md gap-y-2 shadow  " >
                        <div className="flex p-2 gap-2 cursor-pointer">
                            <p className="border rounded-full h-6 w-6 p-2 flex items-center justify-center " >
                                {index + 1}
                            </p>
                            <h1>{parseHtmlContent(option?.mcq_question_text)}</h1>
                        </div>
                    </div>)
                }
            </div>
        </Card>
    )
}

export default McqExamCard