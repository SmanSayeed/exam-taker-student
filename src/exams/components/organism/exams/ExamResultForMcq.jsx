import { ExamResultForMcqCard } from "../../molecules/exams/ExamResultForMcqCard";

export default function ExamResultForMcq({ filteredQues }) {

    return (
        <div>
            {
                filteredQues?.map((que, index) => (
                    <ExamResultForMcqCard
                        key={que?.id}
                        queIndex={index}
                        question={que}
                    />
                ))
            }
        </div>
    );
}