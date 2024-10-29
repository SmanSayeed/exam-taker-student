import Loading from "../components/atoms/Loading";
import ExamHistoryCard from "../components/molecules/exams/ExamHistoryCard";
import { useGetAllExamsQuery } from "../features/exams/examsApi";

const ExamHistoryPage = () => {
    const { data: allExams, isLoading } = useGetAllExamsQuery();

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