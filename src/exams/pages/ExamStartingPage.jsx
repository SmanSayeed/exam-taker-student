import { Card, CardHeader } from "@/components/ui/card";
import { Pin } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { DrawerForQuestionFilter } from "../components/organism/DrawerForQuestionFilter";
import ExamStartingForm from "../components/organism/exams/ExamStartingForm";

export default function ExamStartingPage() {
  const [filteredQuestions, setFilteredQuestions] = useState(null);

  const handleFilteredQuestions = (filteredQues) => {
    setFilteredQuestions(filteredQues);
  };

  return (
    <div>
      <Card className="text-center">
        <CardHeader>
          <h1 className="text-4xl mt-10 ">Welcome to the OES!</h1>
          <p>
            Here, you can easily access and take your exams. Best of luck with
            your assessments.
          </p>
        </CardHeader>

        <DrawerForQuestionFilter
          onFilterQuestions={handleFilteredQuestions}
        />

        <Card className="text-left my-5 p-5 w-full md:w-3/4 mx-auto relative ">
          <Pin className="mb-3" />
          <p className="font-medium underline">Instructions to candidates:</p>
          <ul className="list-disc mt-3 ml-5 text-sm space-y-2 tracking-wider ">
            <li className="">
              According to your preparation, select the{" "}
              <span className="font-semibold">type of question</span> through
              the filter above and enter the{" "}
              <span className="font-semibold">question number</span> and{" "}
              <span className="font-semibold">test time</span> in the box below
              and click on the start button to start the test.
            </li>
            <li>
              Negative Marking 0.25 for each wrong answer and medical admission
              students will get 5% deduction from total marks if they click on{" "}
              <span className="font-semibold">2nd Time</span> option.
            </li>
            <li>
              Randomly from a database of millions of questions will show you a
              certain number of questions per set.
            </li>
            <li>
              All the exam answer sheets will be saved for all the exams you
              take, you can see all the exam answer sheets by clicking on the{" "}
              <span className="font-semibold">Exam Performance</span> option
              below.
            </li>
          </ul>
        </Card>

        <Card className="my-2 p-5 w-full md:w-3/4 lg:w-3/6 mx-auto">
          <ExamStartingForm
            filteredQuestions={filteredQuestions}
          />
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