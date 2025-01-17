import { Card, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreativeExamForMT } from "@/exams/components/molecules/packages/mtexam/CreativeExamForMT";
import { McqExamCardForMT } from "@/exams/components/molecules/packages/mtexam/McqExamCardForMT";
import { MTExamTimer } from "@/exams/components/molecules/packages/mtexam/MTExamTimer";
import { NormalExamForMT } from "@/exams/components/molecules/packages/mtexam/NormalExamForMT";
import { useUploadAnswerFileMutation } from "@/features/packages/mtExamsApi";
import { updateFileUrl } from "@/features/packages/mtExamSlice";
import { useGetSingleModelTestQuery } from "@/features/packages/packagesApi";
import { calculateDuration } from "@/helpers/dateFormatter";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function MTExamOnGoingPage() {
    const dispatch = useDispatch();

    const { student } = useSelector((state) => state.auth);
    const { activeExam } = useSelector((state) => state.mtExam);
    const { exam, questions_list, fileUrl } = activeExam || {};

    const { modelTestId } = useParams();
    const { data: modelTestData } = useGetSingleModelTestQuery(modelTestId);
    const startTime = modelTestData?.data?.start_time;
    const endTime = modelTestData?.data?.end_time;
    const duration = calculateDuration(startTime, endTime);

    const [uploadAnswerFile, { isLoading: isUploading }] = useUploadAnswerFileMutation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            alert("File size exceeds the limit of 10MB.");
            return;
        }

        const payload = new FormData();
        payload.append("student_id", student.id);
        payload.append("exam_id", exam?.id);
        payload.append("answer_file", file);

        try {
            const response = await uploadAnswerFile(payload).unwrap();
            toast.success(response.message || "file uploaded successfully");

            dispatch(updateFileUrl({
                examId: exam?.id,
                fileUrl: {
                    cdn_url: response?.data?.file?.cdn_url,
                    file_name: response?.data?.file?.original_filename,
                    file_size: (response?.data?.file?.file_size / 1024 / 1024).toFixed(2),
                }
            }));
        } catch (error) {
            console.error(error);
            toast.error(error?.data?.message);
        }
    };

    if (!activeExam) {
        return <p>Loading exam data...</p>;
    }

    return (
        <>
            <div className="px-5 w-full">
                <Card className="text-center p-4 relative mt-2">
                    <CardTitle>{exam?.title}</CardTitle>
                    <p className="mt-3">Time: {duration} minutes</p>
                    <p>{questions_list[0]?.mark} mark per question and 0.25 marks will be deducted for each mistake</p>
                </Card>

                <div className="text-center">
                    {/* mcq exam question */}
                    {exam.type === "mcq" &&
                        questions_list.map((question, index) => (
                            <McqExamCardForMT key={question?.id} queIndex={index} question={question} />
                        ))}

                    {/* creative question exam question */}
                    {exam.type === "creative" &&
                        questions_list.map((question, index) => (
                            <CreativeExamForMT key={question?.id} queIndex={index} question={question} />
                        ))}

                    {/* normal question exam question */}
                    {exam.type === "normal" &&
                        questions_list.map((question, index) => (
                            <NormalExamForMT key={question?.id} queIndex={index} question={question} />
                        ))}
                </div>

                {/* File Upload Section */}
                {
                    (exam.type === "creative" || exam.type === "normal") && (
                        <div className="mt-6">
                            <label className="block font-medium text-gray-700 mb-2">
                                Upload Answer File((Max file size: 10MB))
                            </label>
                            <div className="flex items-center gap-4">
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-lg border border-blue-600 hover:bg-green-200"
                                >
                                    {isUploading ? "Uploading..." : "Attach File"}
                                    <input
                                        type="file"
                                        id="file-upload"
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                        disabled={isUploading}
                                    />
                                </label>
                            </div>

                            {/* File Preview Section */}
                            {fileUrl && (
                                <div className="mt-4 bg-blue-50 rounded-lg p-4 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="text-blue-600">📎</span>
                                        <p className="text-gray-800 text-sm">
                                            {fileUrl.file_name} <span className="text-gray-500">({fileUrl.file_size}MB)</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }
            </div>

            {/* MTExam Timer */}
            <div className="fixed bottom-0 left-0 right-0 px-4 flex flex-col justify-center items-center gap-2 z-50">
                <MTExamTimer startTime={startTime} endTime={endTime} />
            </div>
        </>
    );
}



