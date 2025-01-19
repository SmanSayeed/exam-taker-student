import { useGetSingleQuestionsQuery } from "@/features/questions/questionsApi";

export const McqQuesForSubmissionView = ({ queId }) => {
    const { data: question } = useGetSingleQuestionsQuery(queId);
    console.log("single question", question)

    return (
        <div>McqQuesForSubmissionView</div>
    )
}