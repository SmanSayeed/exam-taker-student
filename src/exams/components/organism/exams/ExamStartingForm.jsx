import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStartExamMutation } from "@/exams/features/exams/examsApi";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ExamStartingForm = ({ filteredQuestions }) => {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [startExam, { isLoading: isExamStarting }] = useStartExamMutation();

    const handleStartExam = async (formData) => {
        // if (filteredQuestions.length === 0) {
        //   toast.warning("Please filter your questions first.");
        //   return;
        // }

        const payload = {
            title: "Math Final Exam",
            description: "Final examination for the math course.",
            is_paid: false,
            created_by: auth.student.id,
            created_by_role: "student",
            type: filteredQuestions.questionType,
            time_limit: formData.timeCount,
            is_negative_mark_applicable: true,
            questions_limit: formData.numberOfQuestion,
            section_categories: filteredQuestions.section || [],
            exam_type_categories: filteredQuestions.exam_type || [],
            exam_sub_type_categories: filteredQuestions.exam_sub_type || [],
            group_categories: filteredQuestions.group || [],
            level_categories: filteredQuestions.level || [],
            lesson_categories: filteredQuestions.lesson || [],
            topic_categories: filteredQuestions.topic || [],
            sub_topic_categories: filteredQuestions.sub_topic || [],
            year_categories: filteredQuestions.year || [],
        };

        try {
            const response = await startExam(payload).unwrap();
            console.log("response", response);

            navigate("/exam-on-going");
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleStartExam)}>
            <div className="grid gap-4">
                <div className="flex items-start flex-col gap-1">
                    <div id="number-o-questions" className="w-full text-center">
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <Input
                                {...register("numberOfQuestion", {
                                    required: "Number of questions is Required",
                                })}
                                name="numberOfQuestion"
                                type="number"
                                placeholder="Number of Questions"
                            />
                            <Input
                                {...register("timeCount", {
                                    required: "Time is Required",
                                })}
                                name="timeCount"
                                type="number"
                                placeholder="Time count(in minutes)"
                            />
                        </div>
                        <Button type="submit" disabled={isExamStarting}>
                            {isExamStarting ? "Starting" : "Start"}
                        </Button>
                    </div>
                    {errors.numberOfQuestion && (
                        <span className="text-red-500 font-semibold text-sm">
                            {errors.numberOfQuestion.message}
                        </span>
                    )}
                </div>
            </div>
        </form>
    )
}

export default ExamStartingForm