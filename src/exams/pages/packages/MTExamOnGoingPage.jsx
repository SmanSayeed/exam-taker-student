import { Card, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { CreativeExamForMT } from "@/exams/components/molecules/packages/mtexam/CreativeExamForMT";
import { McqExamCardForMT } from "@/exams/components/molecules/packages/mtexam/McqExamCardForMT";
import { MTExamTimer } from "@/exams/components/molecules/packages/mtexam/MTExamTimer";
import { useGetSingleModelTestQuery } from "@/features/packages/packagesApi";
import { calculateDuration } from "@/helpers/dateFormatter";
import { useParams } from "react-router-dom";

export default function MTExamOnGoingPage() {
    const { activeExam } = useSelector((state) => state.mtExam);
    const { exam, questions_list } = activeExam || {};

    const { modelTestId } = useParams();
    const { data: modelTestData } = useGetSingleModelTestQuery(modelTestId);
    const startTime = modelTestData?.data?.start_time;
    const endTime = modelTestData?.data?.end_time;
    const duration = calculateDuration(startTime, endTime);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!activeExam) {
        return <p>Loading exam data...</p>;
    }

    return (
        <>
            <div className="px-5 w-full">
                <Card className="text-center p-4 relative mt-2">
                    <CardTitle>{exam?.title}</CardTitle>
                    <p className="mt-3">Time: {duration} minutes</p>
                    <p>{questions_list[0]?.mark} mark per question and 0.25 marks will be deducted for each mistake</p>
                </Card>

                <div className="text-center">
                    {/* mcq exam question */}
                    {exam.type === "mcq" && (
                        questions_list.map((question, index) => (
                            <McqExamCardForMT
                                key={question?.id}
                                queIndex={index}
                                question={question}
                            />
                        ))
                    )}

                    {/* creative exam question */}
                    {exam.type === "creative" && (
                        questions_list.map((question, index) => (
                            <CreativeExamForMT
                                key={question?.id}
                                queIndex={index}
                                question={question}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* mtexam timer */}
            <div className="fixed bottom-0 left-0 right-0 px-4 flex flex-col justify-center items-center gap-2 z-50">
                <MTExamTimer startTime={startTime} endTime={endTime} />
            </div>
        </>
    );
}