import { ExamResultForMcqCard } from "../../molecules/exams/ExamResultForMcqCard";

export default function ExamResultForMcq({ submittedQues }) {

    return (
        <div>
            {
                submittedQues?.map((que, index) => (
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