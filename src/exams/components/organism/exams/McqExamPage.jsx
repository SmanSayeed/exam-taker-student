import McqExamCard from "../../molecules/exams/McqExamCard";

export default function McqExamPage({ filteredQues }) {

    return (
        <div>
            {
                filteredQues?.map((que, index) => (
                    <McqExamCard
                        key={que?.id}
                        queIndex={index}
                        question={que}
                    />
                ))
            }
        </div>
    );
}