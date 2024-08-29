import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CategoriesExam from "../components/organism/CategoriesExam";
import { useForm } from "react-hook-form";
// import { Input } from "../../../../components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "../../../../components/ui/label";
import { Label } from "./../../components/ui/label";
import { Input } from "./../../components/ui/input";
import { Checkbox } from "./../../components/ui/checkbox";
import { Button } from "./../../components/ui/button";


export default function ExamPage() {
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
          <CategoriesExam />
        </CardHeader>
        <div className="">
          <h1 className="text-5xl group  w-fit mx-auto my-10 ">
            <span className="mx-3 relative inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text group-hover:from-green-500 group-hover:via-yellow-500 group-hover:to-red-500 duration-1000">
              Unlimited
            </span>
            <span className="text-2xl">practice on millions of </span>
            <span className="mx-3 relative inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text group-hover:from-green-500 group-hover:via-yellow-500 group-hover:to-red-500 duration-1000">
              Questions
            </span>
          </h1>

          <Card className="text-left my-5 p-5 w-full md:w-3/4 mx-auto ">
            <p className="font-medium underline">Instructions to candidates:</p>
            <ul className="list-disc mt-3 ml-5 text-sm space-y-2 tracking-wider ">
              <li className="">
                According to your preparation, select the type of question through the filter above and enter the question number and test time in the box below and click on the start button to start the test.
              </li>
              <li>
                Negative Marking 0.25 for each wrong answer and medical admission students will get 5% deduction from total marks if they click on Second Time option.
              </li>
              <li>
                Randomly from a database of millions of questions will show you a certain number of questions per set.
              </li>
              <li>
                All the exam answer sheets will be saved for all the exams you take, you can see all the exam answer sheets by clicking on the Exam Performance option below.
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

                  <button
                    // disabled={isLoading}
                    type="submit"
                    className="w-fit font-medium bg-slate-500 py-1 px-5 rounded-lg  hover:bg-gray-400"
                  >
                    Start
                  </button>
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
