import { Button } from "@/components/ui/button";
import { useGetSingleStuResultQuery } from "@/features/packages/packagesApi";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { MTExamTimer } from "./MTExamTimer";

export const MTExamActions = ({ isActive, startTime, endTime, isLoading, onExamsSubmit, allExamsSubmitted, modelTestId }) => {
    const auth = useSelector(state => state.auth);

    const { data: studentResultData } = useGetSingleStuResultQuery({ studentId: auth.student.id, modelTestId });

    const handleSubmit = () => {
        if (allExamsSubmitted) {
            const endDate = new Date(endTime);

            if (endDate.getTime() > Date.now()) {
                toast.error('You can not view results before the end time of the exam.');
            } else {
                // single student result shown here
            }
        } else {
            onExamsSubmit();
        }
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 px-4 flex flex-col justify-center items-center gap-2 z-50">
            {
                isActive && (
                    <MTExamTimer
                        startTime={startTime}
                        endTime={endTime}
                    />
                )
            }

            <Button
                onClick={handleSubmit}
                className={`text-white text-lg w-full ${allExamsSubmitted ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'}`}
                disabled={isLoading}
            >
                {isLoading ? "Submitting..." : allExamsSubmitted ? "View Results" : "Finish All Exams"}
            </Button>
        </div>
    );
}
