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

import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function ExamOnGoingPage() {
  const naviagte = useNavigate();
  const exam = useSelector(state => state.exam);

  const { exam: examData, questions_list } = exam;
  const time = examData.time_limit;
  const questionType = examData.type;

  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isFullSubmitAlertOpen, setIsFullSubmitAlertOpen] = useState(false);

  const [mcqAnswers, setMcqAnswers] = useState(
    questions_list.map((question) => {
      const firstMcqQuestionId = question.mcq_questions?.[0]?.id || null;

      return {
        question_id: question.id,
        mcq_question_id: firstMcqQuestionId,
        submitted_mcq_option: null
      };
    })
  );

  console.log("mcqanswers", mcqAnswers)

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

  const [finishExam, { isLoading: isExamFinishing }] = useFinishExamMutation();

  // const handleSubmit = async () => {

  //   // Find unanswered questions (where submitted_mcq_option is null)
  //   const skippedQuestions = mcqAnswers.filter(answer => answer.submitted_mcq_option === null);

  //   if (skippedQuestions.length > 0) {
  //     // Show error notification for skipped questions
  //     toast.error(`You have skipped ${skippedQuestions.length} question(s). They will be marked as unanswered.`);
  //   }

  //   const payload = {
  //     "examination_id": examData.id,
  //     "student_id": examData.created_by,
  //     "type": questionType,
  //     "mcq_answers": mcqAnswers,
  //     // "creative_answers": [
  //     //   {
  //     //     "question_id": 20,
  //     //     "creative_question_id": 201,
  //     //     "creative_question_option": "Option A",
  //     //     "creative_question_text": "This is the creative answer text."
  //     //   }
  //     // ],
  //     // "normal_answers": [
  //     //   {
  //     //     "question_id": 30,
  //     //     "normal_answer_text": "This is a normal answer text."
  //     //   }
  //     // ]
  //   }

  //   try {
  //     const response = await finishExam(payload).unwrap();

  //     if (response.examination && response.mcq_answers) {
  //       naviagte("/exam-result");
  //     }
  //   } catch (err) {
  //     toast.error(err?.data?.message || "An error occurred");
  //   }

  // }

  // Handle submit logic

  const handleSubmit = () => {
    const skippedQuestions = mcqAnswers.filter(answer => answer.submitted_mcq_option === null);

    if (skippedQuestions.length > 0) {
      // Show confirmation dialog if there are skipped questions
      setIsAlertOpen(true);
    } else {
      // Show confirmation for full submission
      setIsFullSubmitAlertOpen(true);
    }
  };

  // Function to submit exam
  const submitExam = async () => {
    const payload = {
      "examination_id": examData.id,
      "student_id": examData.created_by,
      "type": questionType,
      "mcq_answers": mcqAnswers,
      // Add other answers (creative, normal) as needed
    };

    try {
      const response = await finishExam(payload).unwrap();

      if (response.examination && response.mcq_answers) {
        naviagte("/exam-result");
      }
    } catch (err) {
      toast.error(err?.data?.message || "An error occurred");
    }
  };

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

      {/* Skipped Questions Alert Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Skipped Questions</AlertDialogTitle>
            <AlertDialogDescription>
              You have skipped some questions. Are you sure you want to submit the exam?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setIsAlertOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={() => {
              setIsAlertOpen(false);
              submitExam();
            }}>
              Yes, Submit
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Full Submission Confirmation Alert Dialog */}
      <AlertDialog open={isFullSubmitAlertOpen} onOpenChange={setIsFullSubmitAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered all the questions. Are you sure you want to submit the exam?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setIsFullSubmitAlertOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={() => {
              setIsFullSubmitAlertOpen(false);
              submitExam();
            }}>
              Yes, Submit
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}