import { useGetAllExamsQuery } from "@/features/exams/examsApi";
import Loading from "../components/atoms/Loading";
import ExamHistoryCard from "../components/molecules/exams/ExamHistoryCard";

const ExamHistoryPage = () => {
    const { data: allExams, isLoading } = useGetAllExamsQuery();
    console.log("allexams", allExams)

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="py-10 space-y-4">
            {
                allExams?.exams.map((exam) => (
                    <ExamHistoryCard key={exam?.id} exam={exam} />
                ))
            }
        </div>
    )
}

export default ExamHistoryPage;