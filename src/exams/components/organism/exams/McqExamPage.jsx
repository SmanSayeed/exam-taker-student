import McqExamCard from "../../molecules/exams/McqExamCard";
// import DOMPurify from "dompurify";
// import { useDeleteQuestionMutation } from "@/features/questions/questionsApi";

// Helper function to parse HTML string and convert to JSX with Tailwind classes
// const parseHtmlContent = (htmlContent) => {
//     return (
//         <div
//             dangerouslySetInnerHTML={{
//                 __html: DOMPurify.sanitize(htmlContent),
//             }}
//         />
//     );
// };

export default function McqExamPage({ filteredQues }) {
    // { data: questionData }
    // const { id, title, description, is_paid, is_featured, type, mark } =
    //     questionData  {};

    // const [deleteQuestion, { error }] = useDeleteQuestionMutation();

    // const handleDelete = async (id) => {
    //     if (id) {
    //         try {
    //             const response = await deleteQuestion(id).unwrap();
    //             toast.success(response?.message  "Data deleted successfully");
    //         } catch (err) {
    //             toast.error(err?.data?.message || "An error occurred");
    //         }
    //     } else {
    //         toast.error("Cannot Delete the Data");
    //     }
    // };

    return (
        <div>
            {
                filteredQues?.map((que, index) => (
                    <McqExamCard key={que?.id} queIndex={index} question={que} />
                ))
            }
        </div>
    );
}