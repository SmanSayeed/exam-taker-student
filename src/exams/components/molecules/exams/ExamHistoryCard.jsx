import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ExamHistoryCard = ({ exam }) => {
    const isoDate = exam?.created_at;
    const date = new Date(isoDate);

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    const numbers = exam?.questions;
    const numberArray = numbers.split(',');
    const totalQuestions = numberArray.length;

    return (
        <Card className="w-[95%] md:w-[85%] mx-auto px-4 py-2">

            <Link to={`/exam-history/${exam?.id}`}>
                <div className="flex items-center justify-between">
                    <span>{exam?.answers[0]?.total_marks}/{totalQuestions * 5} </span>
                    <span>{formattedDate}</span>
                </div>
                <div>
                    <div className="pt-2 font-bold">পদার্থবিজ্ঞান</div>
                    <div>
                        <div className="pt-2 ">১ম পত্র</div>
                        <div>
                            <div>ভেক্টর </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="tag tag-cyan uppercase">varsity</div>
                </div>
            </Link>

        </Card>
    )
}

export default ExamHistoryCard;