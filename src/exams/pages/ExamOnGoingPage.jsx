import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import CountdownTimer from "../components/molecules/exams/CountdownTimer";
import CreativeExamPage from "../components/organism/exams/CreativeExamPage";
import McqExamPage from "../components/organism/exams/McqExamPage";
import NormalExamPage from "../components/organism/exams/NormalExamPage";

export default function ExamOnGoingPage() {
  const location = useLocation();
  console.log(location.state)
  const filteredQues = location.state?.filteredQuestions;
  const time = location.state?.time;
  const questionType = location.state.questionType;

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
        {questionType === "mcq" && <McqExamPage filteredQues={filteredQues} />}
        {questionType === "normal" && <NormalExamPage />}
        {questionType === "creative" && <CreativeExamPage />}
        <Button className="w-full " >Submit</Button>
      </div>
    </div>
  )
}