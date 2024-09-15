import { Card, CardTitle } from "@/components/ui/card";
import { ResultShowingModal } from "../../molecules/ui/ResultShowingModal";
// import DOMPurify from "dompurify";
// import { useDeleteQuestionMutation } from "@/features/questions/questionsApi";

// // Helper function to parse HTML string and convert to JSX with Tailwind classes
// const parseHtmlContent = (htmlContent) => {
//     return (
//         <div
//             dangerouslySetInnerHTML={{
//                 __html: DOMPurify.sanitize(htmlContent),
//             }}
//         />
//     );
// };

export default function NormalExamPage() {
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
        <Card className="p-4 relative group shadow-md my-3 hover:shadow-lg duration-500">
            <CardTitle>

                <p className="mb-4">
                    {/* {parseHtmlContent(title)} */}
                </p>
            </CardTitle>

            <div className="text-xs flex items-center gap-3 mb-1">
                <p>Que ID:
                    {/* {id} */}
                </p>
                <p className="border-l border-gray-500  pl-2 capitalize ">
                    {/* {is_paid === 0 ? "not paid" : "paid"} */}
                    Paid
                </p>
                <p className="border-l border-gray-500  pl-2 capitalize ">
                    {/* {is_featured === 0 ? "not featured" : "featured"} */}
                    Featured
                </p>
                <p className="border-l border-gray-500  pl-2"> <span
                // className={${type === "mcq" ? "uppercase" : "capitalize"}}
                >
                    {/* {type} */}
                </span>Question</p>
                <p className="border-l border-gray-500  pl-2">
                    {/* {mark} */}
                    Marks </p>
            </div>

            <div className="text-sm">
                <div id="section">
                    <p>
                        <span className="font-medium">Section:</span> &rarr; exam-type
                        &rarr; exam sub-type
                    </p>
                </div>
                <div id="group">
                    <p>
                        <span className="font-medium"> Group: </span> &rarr; level &rarr;
                        subject &rarr; exam topic &rarr; exam sub-topic
                    </p>
                </div>
            </div>

            <div className="mt-4 flex gap-2 items-center text-sm ">
                <span className="font-medium ">
                    Descriptions:
                </span>
                {/* {parseHtmlContent(description)} */}
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-3">
                {/* <Button> */}
                <ResultShowingModal
                // data={questionData}
                />
                {/* </Button> */}
            </div>
        </Card>
    );
}