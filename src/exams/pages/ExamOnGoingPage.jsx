import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CountdownTimer from "../components/molecules/exams/CountdownTimer";
import CreativeExamPage from "../components/organism/exams/CreativeExamPage";
import McqExamPage from "../components/organism/exams/McqExamPage";
import NormalExamPage from "../components/organism/exams/NormalExamPage";
import { useFinishExamMutation } from "../features/exams/examsApi";

export default function ExamOnGoingPage() {
  const naviagte = useNavigate();
  const exam = useSelector(state => state.exam);

  const { exam: examData, questions_list } = exam;
  const time = examData.time_limit;
  const questionType = examData.type;

  const [isTimeUp, setIsTimeUp] = useState(false);

  // Function to check if current time is greater than or equal to end_time
  const checkTimeUp = () => {
    const currentTime = new Date().toISOString();
    const endTime = new Date(examData.end_time).toISOString();

    if (currentTime >= endTime) {
      setIsTimeUp(true);
    }
  };

  useEffect(() => {
    if (examData.end_time) {
      // Check the time immediately when the component mounts
      checkTimeUp();

      // Set interval to check the time every second
      const timer = setInterval(checkTimeUp, 1000);

      return () => clearInterval(timer);
    }
  }, [examData.end_time]);

  const [mcqAnswers, setMcqAnswers] = useState([]);

  const [finishExam, { isLoading: isExamFinishing }] = useFinishExamMutation();

  const handleSubmit = async () => {

    const payload = {
      "examination_id": examData.id,
      "student_id": examData.created_by,
      "type": questionType,
      "mcq_answers": mcqAnswers,
      // "creative_answers": [
      //   {
      //     "question_id": 20,
      //     "creative_question_id": 201,
      //     "creative_question_option": "Option A",
      //     "creative_question_text": "This is the creative answer text."
      //   }
      // ],
      // "normal_answers": [
      //   {
      //     "question_id": 30,
      //     "normal_answer_text": "This is a normal answer text."
      //   }
      // ]
    }

    try {
      const response = await finishExam(payload).unwrap();
      console.log("response", response);
      naviagte("/exam-result");
    } catch (err) {
      toast.error(err?.data?.message || "An error occurred");
    }

  }

  return (
    <div className="px-5 w-full ">
      <Card className="text-center p-4 relative ">
        <div className="z-50 fixed right-10 border px-4 py-2 rounded-md flex items-center justify-center  " >
          <CountdownTimer minutes={time} />
        </div>
        <CardTitle> Mock Exam </CardTitle>
        <p className="mt-3" >Time: {time} minutes </p>

        <p>1 mark per question and 0.25 marks will be deducted for each mistake</p>
      </Card>

      <div className="text-center">
        {questionType === "mcq" && (
          <McqExamPage
            filteredQues={questions_list}
            setMcqAnswers={setMcqAnswers}
          />
        )}
        {questionType === "normal" && <NormalExamPage />}
        {questionType === "creative" && <CreativeExamPage />}

        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={isExamFinishing || isTimeUp}
        >
          {isExamFinishing ? "Submitting" : "Submit"}
        </Button>

      </div>
    </div>
  )
}