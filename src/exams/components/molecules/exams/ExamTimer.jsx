import { differenceInSeconds, parseISO } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ExamTimer({ submitExam }) {
  const { exam } = useSelector((state) => state.exam);
  // const endTime = exam ? parseISO(exam?.end_time) : null;
  const endTime = exam && exam.end_time ? parseISO(exam.end_time) : null;

  // Calculate initial time left whenever exam changes
  const calculateInitialTime = useCallback(() => {
    if (!endTime) return 0;
    const now = new Date();
    return Math.max(differenceInSeconds(endTime, now), 0);
  }, [endTime]);

  // Reset timer when exam changes
  useEffect(() => {
    const initialTime = calculateInitialTime();
    setTimeLeft(initialTime);
  }, [exam?.end_time, calculateInitialTime]);

  const [timeLeft, setTimeLeft] = useState(calculateInitialTime());
  const [examSubmitted, setExamSubmitted] = useState(false);

  const handleSubmitExam = useCallback(async () => {
    if (!examSubmitted) {
      await submitExam();
      setExamSubmitted(true);
    }
  }, [submitExam, examSubmitted]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const updatedTimeLeft = Math.max(prevTime - 1, 0);
        if (updatedTimeLeft === 0) {
          clearInterval(timer);
          handleSubmitExam(); // Auto-submit on time out
        }
        return updatedTimeLeft;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [handleSubmitExam]);

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
      {timeFinished && <p className="text-red-500 font-semibold">Time Over!</p>}
    </div>
  );
}

export default ExamTimer;
