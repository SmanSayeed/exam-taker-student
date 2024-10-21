import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useStartExamMutation } from "@/exams/features/exams/examsApi";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import QuesCategoryForFilter from "../../molecules/filterquesforexam/QuesCategoryForFilter";

const ExamStartingForm = () => {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    const [startExam, { isLoading: isExamStarting }] = useStartExamMutation();

    const handleStartExam = async (formData) => {
        if (!auth?.student) navigate("/login");

        const payload = {
            title: "Math Final Exam",
            description: "Final examination for the math course.",
            is_paid: false,
            created_by: auth.student.id,
            created_by_role: "student",
            type: formData.questionType,
            time_limit: formData.timeCount,
            is_negative_mark_applicable: true,
            questions_limit: formData.numberOfQuestion,
            section_categories: formData.section || [],
            exam_type_categories: formData.exam_type || [],
            exam_sub_type_categories: formData.exam_sub_type || [],
            group_categories: formData.group || [],
            level_categories: formData.level || [],
            lesson_categories: formData.lesson || [],
            topic_categories: formData.topic || [],
            sub_topic_categories: formData.sub_topic || [],
            year_categories: formData.year || [],
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
        <form onSubmit={handleSubmit(handleStartExam)} className="w-[95%] md:w-[90%] mx-auto ">
            <div className="grid gap-4">
                <div className="flex items-start flex-col gap-1">
                    <div id="number-o-questions" className="w-full text-center">
                        {/* ..... */}
                        <div>
                            {/* question types */}
                            <div className="space-y-1 ">
                                <Label className="text-md text-left font-semibold">Question Type: </Label>
                                <Controller
                                    name="questionType"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                onValueChange={(val) => {
                                                    field.onChange(val)
                                                }}
                                                value={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="normal">Normal</SelectItem>
                                                    <SelectItem value="mcq">MCQ</SelectItem>
                                                    <SelectItem value="creative">Creative</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </>
                                    )}
                                />
                            </div>

                            {/* questions category filter */}
                            <QuesCategoryForFilter
                                control={control}
                                setValue={setValue}
                            />
                        </div>
                        {/* ..... */}
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
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
                        <Button type="submit" disabled={isExamStarting} className="mt-2 w-full ">
                            {isExamStarting ? "Starting" : "Start Exam"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ExamStartingForm;