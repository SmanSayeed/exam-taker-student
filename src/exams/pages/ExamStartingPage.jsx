import { Card, CardHeader } from "@/components/ui/card";
import ExamStartingForm from "../components/organism/exams/ExamStartingForm";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "@/features/auth/authApi";
import { useGetMaxFreeExamQuery } from "@/features/quota/quotaApi";

export default function ExamStartingPage() {
  const auth = useAuth();
  const [freeQuota, setFreeQuota] = useState(0);
  const [examCount, setExamCount] = useState(0);
  const [paidExamCount, setPaidExamCount] = useState(0);
  const navigate = useNavigate();
  
  const { 
    data: profileData, 
    isLoading: isLoadingProfile,
    refetch: refetchProfile 
  } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true // This will refetch when component mounts
  });
  
  const { 
    data: maxFreeExamData, 
    isLoading: loadingMaxFreeExam 
  } = useGetMaxFreeExamQuery();

  useEffect(() => {
    if (profileData) {
      setFreeQuota(maxFreeExamData?.maximum_free_exam);
      setExamCount(profileData?.data?.exams_count || 0);
      setPaidExamCount(profileData?.data?.paid_exam_quota || 0);
    }
  }, [profileData, maxFreeExamData]);

  // Refetch profile when component mounts
  useEffect(() => {
    refetchProfile();
  }, [refetchProfile]);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  console.log("profileData", profileData);
  console.log("exams_count ", profileData?.data?.exams_count, examCount);
  console.log("paid_exam_count ", profileData?.data?.paid_exam_count, paidExamCount);

  return (
    <Card className="text-center pb-6 ">
      <CardHeader>
        <h1 className="text-4xl font-semibold ">Welcome to the Loopsacademy</h1>
        <p>
          Here, you can easily access and take your exams. Best of luck with
          your assessments.
        </p>
        <div className="mt-4">
          {paidExamCount > 0 ? (
            <p className="mt-2 text-sm text-gray-600">
            You can take      <span className="font-semibold text-yellow-600"> {paidExamCount} paid exams.</span><br/> Total <span className="font-semibold text-yellow-600"> {paidExamCount - examCount}
            </span> exams left
         </p>
          ) : (
            <>
              {loadingMaxFreeExam ? (
                <p className="mt-2 text-sm text-gray-600">Loading...</p>
              ) : (
                <>

<p className="mt-2 text-sm text-gray-600">
                  You can attend total{" "}
                  <span className="font-semibold text-yellow-600">
                    {freeQuota - examCount} exams
                  </span>{" "}
                  for free
                </p>
                
                <div className="flex justify-center items-center">
          <Link
            className="text-sm bg-blue-500 text-white p-2 rounded-xl w-[300px] text-center flex justify-center items-center"
            to="/buy-quota"
          >
            Buy Paid Exam Quota
          </Link>
        </div></>
                
              )}
            </>
          )}
        </div>
    
      </CardHeader>

      <ExamStartingForm maxFreeExam={maxFreeExamData?.maximum_free_exam} />
    </Card>
  );
}