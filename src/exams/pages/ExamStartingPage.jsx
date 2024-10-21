import { Card, CardHeader } from "@/components/ui/card";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExamStartingForm from "../components/organism/exams/ExamStartingForm";
import useAuth from "../hooks/useAuth";

export default function ExamStartingPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
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