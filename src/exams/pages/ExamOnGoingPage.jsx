import CreativeQuestionCard from "../components/molecules/ui/CreativeQuestionCard";
import McqQuestionCard from "../components/molecules/ui/MCQQuestionCard";
import NormalQuestionCard from "../components/molecules/ui/NormalQuestionCard";

export default function ExamOnGoingPage() {
  return (
    <div>
      <CreativeQuestionCard />
      <McqQuestionCard />
      <NormalQuestionCard />
    </div>
  )
}
