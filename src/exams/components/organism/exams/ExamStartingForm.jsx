import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStartExamMutation } from "@/features/exams/examsApi";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import QuesCategoryForFilter from "../../molecules/filterquesforexam/QuesCategoryForFilter";

const Modal = ({ isOpen, onClose, onRedirect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Exam Quota Limit Exceeded</h2>
        <p className="text-sm mb-4">
          You have exceeded your free exam quota. Would you like to purchase
          additional exam quota?
        </p>
        <div className="flex justify-end space-x-4">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={onRedirect}>Buy Quota</Button>
        </div>
      </div>
    </div>
  );
};

const ExamStartingForm = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [startExam, { isLoading: isExamStarting }] = useStartExamMutation();

  const handleStartExam = async (formData) => {
    if (!auth?.student) navigate("/");

    const payload = {
      title: "Math Final Exam",
      description: "Final examination for the math course.",
      is_paid: false,
      created_by: auth.student.id,
      created_by_role: "student",
      type: "mcq",
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
      if (
        err.data?.quota_info?.paid_quota_exceeded &&
        err.data?.quota_info?.free_quota_exceeded
      ) {
        setModalOpen(true);
      } else {
        toast.error(
          err?.data?.error || err?.data?.message || "An error occurred"
        );
      }
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onRedirect={() => navigate("/buy-quota")}
      />
      <form
        onSubmit={handleSubmit(handleStartExam)}
        className="w-[95%] md:w-[90%] mx-auto "
      >
        <div className="grid gap-4">
          <div className="flex items-start flex-col gap-1">
            <div id="number-o-questions" className="w-full">
              {/* question types */}
              <div className="space-y-2 text-start">
                <Label className="text-md font-semibold">
                  Question Type: MCQ{" "}
                </Label>
              </div>

              {/* questions category filter */}
              <div className="space-y-2 py-4 text-start">
                <Label className="text-md font-semibold">
                  Select Category:{" "}
                </Label>
                <QuesCategoryForFilter control={control} setValue={setValue} />
              </div>

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
                    defaultValue={10}
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
                    defaultValue={20}
                  />
                  {errors.timeCount && (
                    <span className="text-red-500 font-semibold text-sm ">
                      {errors.timeCount.message}
                    </span>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                disabled={isExamStarting}
                className="mt-2 w-full"
              >
                {isExamStarting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Start Exam"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ExamStartingForm;
