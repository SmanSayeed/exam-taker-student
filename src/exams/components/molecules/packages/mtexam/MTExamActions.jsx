import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MTExamTimer } from "./MTExamTimer";

export const MTExamActions = ({ isActive, startTime, endTime, isLoading, onExamsSubmit, allExamsSubmitted, modelTestId }) => {
    const navigate = useNavigate();

    const endDate = new Date(endTime);
    const isExamEnded = endDate.getTime() < Date.now();

    const handleResultShow = () => {
        if (!isExamEnded) {
            toast.error('You can not view results before the end time of the exam.');
        } else {
            navigate(`/model-test/${modelTestId}/mtexam-result`);
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

            {
                allExamsSubmitted || isExamEnded ? (
                    <Button
                        onClick={handleResultShow}
                        className="text-lg w-full bg-blue-600 hover:bg-blue-800"
                    >
                        View Result
                    </Button>
                ) : (
                    <Button
                        onClick={() => onExamsSubmit()}
                        className="text-white text-lg w-full bg-red-500 hover:bg-red-600"
                        disabled={isLoading}
                    >
                        {isLoading ? "Submitting..." : "Finish All Exams"}
                    </Button>
                )
            }
        </div>
    );
}
