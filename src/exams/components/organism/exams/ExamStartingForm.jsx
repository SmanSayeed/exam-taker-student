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
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [startExam, { isLoading: isExamStarting }] = useStartExamMutation();

    const handleStartExam = async (formData) => {
        if (!auth?.student) navigate("/login");

        if (!filteredQuestions || !filteredQuestions.questionType) {
            toast.warning("Please filter your questions first.");
            return;
        }

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

            if (response.exam && response.questions_list) {
                navigate("/exam-on-going");
            }
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleStartExam)}>
            <div className="grid gap-4">
                <div className="flex items-start flex-col gap-1">
                    <div id="number-o-questions" className="w-full text-center">
                        <div className="flex flex-col md:flex-row gap-4 mb-1">
                            <div className="w-full text-start ">
                                <Input
                                    {...register("numberOfQuestion", {
                                        required: "Number of questions is Required",
                                        min: {
                                            value: 3,
                                            message: "Minimum 3 question is required",
                                        },
                                        max: {
                                            value: 200,
                                            message: "Maximum 200 questions allowed",
                                        },
                                    })}
                                    name="numberOfQuestion"
                                    type="number"
                                    placeholder="Number of Questions"
                                />
                                {errors.numberOfQuestion && (
                                    <span className="text-red-500 font-semibold text-sm ">
                                        {errors.numberOfQuestion.message}
                                    </span>
                                )}
                            </div>
                            <div className="w-full text-start ">
                                <Input
                                    {...register("timeCount", {
                                        required: "Time is Required",
                                        min: {
                                            value: 3,
                                            message: "Minimum time is 3 minute",
                                        },
                                        max: {
                                            value: 180,
                                            message: "Maximum time is 180 minutes",
                                        },
                                    })}
                                    name="timeCount"
                                    type="number"
                                    placeholder="Time count(in minutes)"
                                />
                                {
                                    errors.timeCount && (
                                        <span className="text-red-500 font-semibold text-sm ">
                                            {errors.timeCount.message}
                                        </span>
                                    )
                                }
                            </div>

                        </div>
                        <Button type="submit" disabled={isExamStarting} className="mt-2">
                            {isExamStarting ? "Starting" : "Start"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ExamStartingForm