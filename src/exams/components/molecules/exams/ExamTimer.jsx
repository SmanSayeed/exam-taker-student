import { updateTimeLeft } from "@/exams/features/exams/examSlice";
import { differenceInSeconds, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ExamTimer({ submitExam }) {
    const dispatch = useDispatch();
    const { exam } = useSelector((state) => state.exam);
    const persistedTimeLeft = useSelector((state) => state.exam.timeLeft);

    const endTime = exam ? parseISO(exam?.end_time) : null;
    const now = new Date();

    const initialTimeLeft = Math.max(differenceInSeconds(endTime, now), 0);
    const [timeLeft, setTimeLeft] = useState(persistedTimeLeft || initialTimeLeft);

    const [examSubmitted, setExamSubmitted] = useState(false); // Track if the exam is submitted

    // Memoize the submitExam function to avoid unnecessary re-renders
    // const handleSubmitExam = useCallback(() => {
    //     if (!examSubmitted && timeLeft === 0) {
    //         try {
    //             submitExam();
    //             setExamSubmitted(true);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    // }, [submitExam, examSubmitted, timeLeft]);

    useEffect(() => {
        if (timeLeft <= 2 && !examSubmitted) {
            submitExam(); // Submit the exam when time reaches 0
            setExamSubmitted(true); // Ensure it only happens once
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                const updatedTimeLeft = Math.max(prevTime - 1, 0);

                dispatch(updateTimeLeft(updatedTimeLeft));

                if (updatedTimeLeft === 0) {
                    clearInterval(timer);
                    // handleSubmitExam();
                }

                return updatedTimeLeft;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [dispatch, submitExam, examSubmitted, timeLeft]);

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const showWarning = timeLeft <= 120 && timeLeft > 0;
    const timeFinished = timeLeft === 0;

    if (!exam || !exam.end_time) {
        return <p>Loading exam details...</p>;
    }

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
