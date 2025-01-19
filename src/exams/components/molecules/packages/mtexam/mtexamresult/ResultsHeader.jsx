import { Card } from "@/components/ui/card";
import { parseHtmlContent } from "@/utils/parseHtmlContent";

export const ResultsHeader = ({ modelTestDetails, combinedResult }) => {
    const progressWidth = ((combinedResult?.total_obtained_marks / modelTestDetails?.full_mark) * 100).toFixed(2);

    return (
        <Card className="p-6 my-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">
                        {parseHtmlContent(modelTestDetails?.title)}
                    </h1>
                    <p>Model Test Results</p>
                </div>

                <div className="flex items-center gap-4 mx-auto md:mx-0">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary">
                            {combinedResult?.total_obtained_marks}
                            <span className="text-base text-muted-foreground">/{modelTestDetails?.full_mark}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Total Score</p>
                    </div>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy h-8 w-8 text-primary" data-sentry-element="Trophy" data-sentry-source-file="ResultsHeader.tsx">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                            <path d="M4 22h16"></path>
                            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="relative w-full bg-gray-700 h-2 rounded mt-4">
                <div
                    className="absolute top-0 left-0 bg-blue-500 h-2 rounded"
                    style={{ width: `${progressWidth}%` }}
                ></div>
            </div>
        </Card>
    );
};
