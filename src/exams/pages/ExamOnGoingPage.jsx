// import { Button } from "@/components/ui/button";
// import { Card, CardTitle } from "@/components/ui/card";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import CreativeExamPage from "../components/organism/exams/CreativeExamPage";
// import McqExamPage from "../components/organism/exams/McqExamPage";
// import NormalExamPage from "../components/organism/exams/NormalExamPage";
// import { useFinishExamMutation } from "../features/exams/examsApi";

// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle
// } from "@/components/ui/alert-dialog";
// import ExamTimer from "../components/molecules/exams/ExamTimer";

// export default function ExamOnGoingPage() {
//   const navigate = useNavigate();
//   const exam = useSelector(state => state.exam);

//   const { exam: examData, questions_list } = exam;
//   const time = examData.time_limit;
//   const questionType = examData.type;

//   const [isAlertOpen, setIsAlertOpen] = useState(false);
//   const [isFullSubmitAlertOpen, setIsFullSubmitAlertOpen] = useState(false);

//   const [mcqAnswers, setMcqAnswers] = useState(
//     questions_list.map((question) => {
//       const firstMcqQuestionId = question.mcq_questions?.[0]?.id || null;

//       return {
//         question_id: question.id,
//         mcq_question_id: firstMcqQuestionId,
//         submitted_mcq_option: null
//       };
//     })
//   );

//   const [finishExam, { isLoading: isExamFinishing }] = useFinishExamMutation();

//   // const handleSubmit = async () => {

//   //   // Find unanswered questions (where submitted_mcq_option is null)
//   //   const skippedQuestions = mcqAnswers.filter(answer => answer.submitted_mcq_option === null);

//   //   if (skippedQuestions.length > 0) {
//   //     // Show error notification for skipped questions
//   //     toast.error(`You have skipped ${skippedQuestions.length} question(s). They will be marked as unanswered.`);
//   //   }

//   //   const payload = {
//   //     "examination_id": examData.id,
//   //     "student_id": examData.created_by,
//   //     "type": questionType,
//   //     "mcq_answers": mcqAnswers,
//   //     // "creative_answers": [
//   //     //   {
//   //     //     "question_id": 20,
//   //     //     "creative_question_id": 201,
//   //     //     "creative_question_option": "Option A",
//   //     //     "creative_question_text": "This is the creative answer text."
//   //     //   }
//   //     // ],
//   //     // "normal_answers": [
//   //     //   {
//   //     //     "question_id": 30,
//   //     //     "normal_answer_text": "This is a normal answer text."
//   //     //   }
//   //     // ]
//   //   }

//   //   try {
//   //     const response = await finishExam(payload).unwrap();

//   //     if (response.examination && response.mcq_answers) {
//   //       naviagte("/exam-result");
//   //     }
//   //   } catch (err) {
//   //     toast.error(err?.data?.message || "An error occurred");
//   //   }

//   // }

//   const handleSubmit = () => {
//     const skippedQuestions = mcqAnswers.filter(answer => answer.submitted_mcq_option === null);

//     if (skippedQuestions.length > 0) {
//       // Show confirmation dialog if there are skipped questions
//       setIsAlertOpen(true);
//     } else {
//       // Show confirmation for full submission
//       setIsFullSubmitAlertOpen(true);
//     }
//   };

//   const submitExam = async () => {
//     const payload = {
//       "examination_id": examData.id,
//       "student_id": examData.created_by,
//       "type": questionType,
//       "mcq_answers": mcqAnswers,
//       // "creative_answers": [
//       //   {
//       //     "question_id": 20,
//       //     "creative_question_id": 201,
//       //     "creative_question_option": "Option A",
//       //     "creative_question_text": "This is the creative answer text."
//       //   }
//       // ],
//       // "normal_answers": [
//       //   {
//       //     "question_id": 30,
//       //     "normal_answer_text": "This is a normal answer text."
//       //   }
//       // ]
//     };

//     try {
//       const response = await finishExam(payload).unwrap();

//       if (response.examination && response.mcq_answers) {
//         naviagte("/exam-result");
//       }
//     } catch (err) {
//       toast.error(err?.data?.message || "An error occurred");
//     }
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="px-5 w-full">
//       <Card className="text-center p-4 relative">
//         <div className="z-50 fixed right-1/4 left1/2 top-2 md:right-28 md:top-4 w-fit mx-auto px-4 py-2 rounded-md flex items-center justify-center">
//           <ExamTimer submitExam={submitExam} />
//         </div>
//         <CardTitle> Mock Exam </CardTitle>
//         <p className="mt-3" >Time: {time} minutes </p>

//         <p>1 mark per question and 0.25 marks will be deducted for each mistake</p>
//       </Card>

//       <div className="text-center">
//         {questionType === "mcq" && (
//           <McqExamPage
//             filteredQues={questions_list}
//             setMcqAnswers={setMcqAnswers}
//           />
//         )}
//         {questionType === "normal" && <NormalExamPage />}
//         {questionType === "creative" && <CreativeExamPage />}

//         <Button
//           onClick={handleSubmit}
//           className="w-full fixed bottom-[.2rem] left-4 right-4 "
//           disabled={isExamFinishing}
//         >
//           {isExamFinishing ? "Submitting" : "Submit"}
//         </Button>
//       </div>

//       {/* Skipped Questions Alert Dialog */}
//       <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Skipped Questions</AlertDialogTitle>
//             <AlertDialogDescription>
//               You have skipped some questions. Are you sure you want to submit the exam?
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <Button onClick={() => setIsAlertOpen(false)} variant="secondary">
//               Cancel
//             </Button>
//             <Button onClick={() => {
//               setIsAlertOpen(false);
//               submitExam();
//             }}>
//               Yes, Submit
//             </Button>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       {/* Full Submission Confirmation Alert Dialog */}
//       <AlertDialog open={isFullSubmitAlertOpen} onOpenChange={setIsFullSubmitAlertOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
//             <AlertDialogDescription>
//               You have answered all the questions. Are you sure you want to submit the exam?
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <Button onClick={() => setIsFullSubmitAlertOpen(false)} variant="secondary">
//               Cancel
//             </Button>
//             <Button onClick={() => {
//               setIsFullSubmitAlertOpen(false);
//               submitExam();
//             }}>
//               Yes, Submit
//             </Button>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   )
// }













import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CreativeExamPage from "../components/organism/exams/CreativeExamPage";
import McqExamPage from "../components/organism/exams/McqExamPage";
import NormalExamPage from "../components/organism/exams/NormalExamPage";
import { useFinishExamMutation } from "../features/exams/examsApi";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { ArrowDownNarrowWideIcon } from "lucide-react";
import ExamTimer from "../components/molecules/exams/ExamTimer";

export default function ExamOnGoingPage() {
  const navigate = useNavigate();
  const exam = useSelector(state => state.exam);

  const { exam: examData, questions_list } = exam;
  const time = examData.time_limit;
  const questionType = examData.type;
  const mcqAnswers = useSelector((state) => state.exam.mcqAnswers);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isFullSubmitAlertOpen, setIsFullSubmitAlertOpen] = useState(false);

  const [finishExam, { isLoading: isExamFinishing }] = useFinishExamMutation();

  const handleSubmit = () => {
    const skippedQuestions = mcqAnswers?.filter(answer => answer.submitted_mcq_option === null);

    if (skippedQuestions?.length > 0) {
      setIsAlertOpen(true);
    } else {
      setIsFullSubmitAlertOpen(true);
    }
  };

  const submitExam = async () => {
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
    };

    try {
      const response = await finishExam(payload).unwrap();

      if (response.examination && response.mcq_answers) {
        navigate("/exam-result");
      }
    } catch (err) {
      toast.error(err?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-5 w-full">
      <Card className="text-center p-4 relative">
        <div className="z-50 fixed right-20 top-2 md:right-28 md:top-4 px-4 py-2 rounded-md flex items-center justify-center gap-2">
          <ExamTimer submitExam={submitExam} />
          <a href="#exam_submit" title="Got to submit">
            <ArrowDownNarrowWideIcon />
          </a>
        </div>
        <CardTitle> Mock Exam </CardTitle>
        <p className="mt-3" >Time: {time} minutes </p>

        <p>1 mark per question and 0.25 marks will be deducted for each mistake</p>
      </Card>

      <div className="text-center">
        {questionType === "mcq" && (
          <McqExamPage
            filteredQues={questions_list}
          />
        )}
        {questionType === "normal" && <NormalExamPage />}
        {questionType === "creative" && <CreativeExamPage />}

        <Button
          id="exam_submit"
          onClick={handleSubmit}
          // className="w-full fixed bottom-[.2rem] left-4 right-4 "
          className="w-full"
          disabled={isExamFinishing}
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