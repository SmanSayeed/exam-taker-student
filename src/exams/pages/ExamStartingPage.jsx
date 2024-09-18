import {
  Card,
  CardHeader
} from "@/components/ui/card";
import { Pin } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { DrawerForQuestionFilter } from "../components/organism/DrawerForQuestionFilter";
import { useStartExamMutation } from "../features/questions/examsApi";

export default function ExamStartingPage() {
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const handleFilteredQuestions = (filteredQues) => {
    setFilteredQuestions(filteredQues);
  };

  const [startExam, { data: examData }] = useStartExamMutation();

  const handleStartExam = async (formData) => {

    // if (filteredQuestions.length === 0) {
    //   toast.warning("Please filter your questions first.");
    //   return;
    // }

    const payload = {
      "title": "Math Final Exam",
      "description": "Final examination for the math course.",
      "is_paid": false,
      "created_by": auth.student.id,
      "created_by_role": "student",
      "type": formData.questionType,
      "time_limit": formData.timeCount,
      "is_negative_mark_applicable": true,
      "questions_limit": formData.numberOfQuestion,
      "section_categories": [],
      "exam_type_categories": [],
      "exam_sub_type_categories": [],
      "group_categories": [],
      "level_categories": [],
      "lesson_categories": [],
      "topic_categories": [],
      "sub_topic_categories": []
    }

    console.log("payload", payload)

    try {
      const response = await startExam(payload).unwrap();
      console.log("response", response)

      navigate("/exam-on-going", {
        state: {
          filteredQuestions: response?.questions_list,
          time: response?.exam?.time_limit,
          questionType: response?.exam?.type,
        },
      });
    } catch (err) {
      toast.error(err?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <Card className="text-center">
        <CardHeader>
          <h1 className="text-4xl mt-10 ">
            Welcome to the OES!
          </h1>
          <p>Here, you can easily access and take your exams. Best of luck with your assessments.</p>
        </CardHeader>

        <DrawerForQuestionFilter
          control={control}
          onFilterQuestions={handleFilteredQuestions}
        />

        <Card className="text-left my-5 p-5 w-full md:w-3/4 mx-auto relative ">
          <Pin className="mb-3" />
          <p className="font-medium underline">Instructions to candidates:</p>
          <ul className="list-disc mt-3 ml-5 text-sm space-y-2 tracking-wider ">
            <li className="">
              According to your preparation, select the <span className="font-semibold">type of question</span> through the filter above and enter the <span className="font-semibold">question number</span> and <span className="font-semibold">test time</span> in the box below and click on the start button to start the test.
            </li>
            <li>
              Negative Marking 0.25 for each wrong answer and medical admission students will get 5% deduction from total marks if they click on <span className="font-semibold">2nd Time</span> option.
            </li>
            <li>
              Randomly from a database of millions of questions will show you a certain number of questions per set.
            </li>
            <li>
              All the exam answer sheets will be saved for all the exams you take, you can see all the exam answer sheets by clicking on the <span className="font-semibold">Exam Performance</span> option below.
            </li>
          </ul>
        </Card>

        <Card className="my-2 p-5 w-full md:w-3/4 lg:w-3/6 mx-auto">
          <form onSubmit={handleSubmit(handleStartExam)}>
            <div className="grid gap-4">
              <div className="flex items-start flex-col gap-1">
                <div id="number-o-questions" className="w-full text-center">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <Input
                      {...register("numberOfQuestion", { required: "Number of questions is Required" })}
                      name="numberOfQuestion"
                      type="number"
                      placeholder="Number of Questions"
                    />
                    <Input
                      {...register("timeCount", { required: "Time is Required" })}
                      name="timeCount"
                      type="number"
                      placeholder="Time count(in minutes)"
                    />
                  </div>
                  <Button to={"/exam-on-going"} type="submit">
                    Start
                  </Button>
                </div>
                {errors.numberOfQuestion && <span className="text-red-500 font-semibold text-sm">{errors.numberOfQuestion.message}</span>}
              </div>
            </div>
          </form>
        </Card>

        <div className="mt-10 mb-4  flex items-center justify-center gap-4">
          <Button>Answer sheets</Button>
          <Button>Performance</Button>
          <Button>Exams</Button>
        </div>
      </Card>
    </div>
  );
}