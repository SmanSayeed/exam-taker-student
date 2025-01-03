import { Card, CardHeader } from "@/components/ui/card";
import ExamStartingForm from "../components/organism/exams/ExamStartingForm";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function ExamStartingPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <Card className="text-center pb-6 ">
      <CardHeader>
        <h1 className="text-4xl font-semibold ">Welcome to the OES!</h1>
        <p>
          Here, you can easily access and take your exams. Best of luck with
          your assessments.
        </p>
      </CardHeader>

      <ExamStartingForm />
    </Card>
  );
}