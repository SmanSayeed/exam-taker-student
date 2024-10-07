import McqExamCardTest from "../../molecules/exams/McqExamCardTest";

export default function McqExamPage({ filteredQues, setMcqAnswers }) {

    return (
        <div>
            {
                filteredQues?.map((que, index) => (
                    // <McqExamCard
                    //     key={que?.id}
                    //     queIndex={index}
                    //     question={que}
                    //     setMcqAnswers={setMcqAnswers}
                    // />

                    <McqExamCardTest
                        key={que?.id}
                        queIndex={index}
                        question={que}
                    />
                ))
            }
        </div>
    );
}