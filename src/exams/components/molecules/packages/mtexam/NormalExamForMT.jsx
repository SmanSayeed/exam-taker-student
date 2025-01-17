import { Card } from "@/components/ui/card";
import DOMPurify from "dompurify";

const parseHtmlContent = (htmlContent) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(htmlContent),
            }}
        />
    );
};

export function NormalExamForMT({ queIndex, question }) {
    const { title } = question || {};

    return (
        <Card className="p-4 relative group shadow-md my-3 hover:shadow-lg dark:bg-gray-100 dark:text-black duration-500">
            {/* Question title */}
            <div className="mb-4 flex items-center justify-between gap-2">
                <div className="flex gap-2">
                    <p className="text-base">{queIndex + 1}. </p>
                    <p className="text-left text-base">{parseHtmlContent(title)}</p>
                </div>
            </div>
        </Card>
    );
}