import { updateTimeLeft } from "@/exams/features/exams/examSlice";
import { differenceInSeconds, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ExamTimer({ submitExam }) {
    const dispatch = useDispatch();
    const { exam } = useSelector((state) => state.exam);
    const persistedTimeLeft = useSelector((state) => state.exam.timeLeft);

    const endTime = parseISO(exam.end_time);
    const now = new Date();

    const initialTimeLeft = Math.max(differenceInSeconds(endTime, now), 0);
    const [timeLeft, setTimeLeft] = useState(persistedTimeLeft || initialTimeLeft);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                const updatedTimeLeft = Math.max(prevTime - 1, 0);

                dispatch(updateTimeLeft(updatedTimeLeft));

                if (updatedTimeLeft === 0) {
                    clearInterval(timer);
                    submitExam();
                }
                return updatedTimeLeft;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [dispatch, submitExam]);

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const showWarning = timeLeft <= 120 && timeLeft > 0;
    const timeFinished = timeLeft === 0;

    return (
        <div>
            <h1 className="font-semibold">Time Left: {formatTime()}</h1>

            {showWarning && (
                <p className="text-red-500 font-semibold">Your exam will end soon!</p>
            )}

            {timeFinished && (
                <p className="text-red-500 font-semibold">Time Over!</p>
            )}
        </div>
    );
}

export default ExamTimer;
