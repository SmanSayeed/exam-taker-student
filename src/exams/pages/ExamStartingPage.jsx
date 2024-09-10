import {
  Card,
  CardHeader
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { DrawerForQuestionFilter } from "../components/organism/DrawerForQuestionFilter";

export default function ExamStartingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleLogin = (formData) => {
    login(formData);
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <h1 className="text-4xl mt-10 ">
            Welcome to the OES!
          </h1>
        </CardHeader>
        <div className="">
          <h1 className="mb-2">Here, you can easily access and take your exams. Best of luck with your assessments.</h1>
          <DrawerForQuestionFilter />


          <Card className="text-left my-5 p-5 w-full md:w-3/4 mx-auto ">
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


          <Card className="my-2 p-5 w-full md:w-3/4 lg:w-3/6 mx-auto" >
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="grid gap-4">
                <div className="flex flex-col md:flex-row gap-6  ">
                  <div id="number-o-questions" className="w-full flex flex-col items-start gap-2 text-center ">
                    <Label htmlFor="number-of-question">Number of questions</Label>
                    <Input
                      {...register("numberOfQuestion", { required: "Number of question is Required" })}
                      name="numberOfQuestion"
                      type="number"
                      placeholder="20"
                    />
                    {errors.numberOfQuestion && <span className="text-red-600">{errors.numberOfQuestion.message}</span>}
                  </div>
                  <div id="exam-time" className="w-full flex flex-col items-start gap-2 text-center">
                    <Label htmlFor="time">Time (in minutes)</Label>
                    <Input
                      {...register("time", { required: "Time is required", })}
                      name="time"
                      type="number"
                      placeholder="10"
                    />
                    {errors.time && <span className="text-left text-red-600">{errors.time.message}</span>}
                  </div>
                </div>


                <div className="flex items-center justify-center gap-6 ">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="active_status"
                    // checked={isActive}
                    // onCheckedChange={(checked) => setIsActive(checked)}
                    />
                    <label
                      htmlFor="active_status"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      2nd timer
                    </label>
                  </div>

                  <Link to={"/exam-on-going"}
                    // disabled={isLoading}
                    type="submit"
                    className="w-fit font-medium bg-slate-500 py-1 px-5 rounded-lg  hover:bg-gray-400"
                  >
                    Start
                  </Link>
                </div>
              </div>
            </form>
          </Card>

          <div className="flex items-center justify-center gap-4">
            <Button>Answer sheets</Button>
            <Button>Performance</Button>
            <Button>Exams</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
