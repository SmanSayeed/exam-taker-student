import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Link } from "react-router-dom"
import DOMPurify from "dompurify";
import { Eye } from "lucide-react";

// Helper function to parse HTML string and convert to JSX with Tailwind classes
const parseHtmlContent = (htmlContent) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(htmlContent),
            }}
        />
    );
};

export function ViewModal({ data }) {
    const { id, title, description, attachable, is_paid, is_featured, type, mark, mcq_questions, creative_questions
    } = data || {};

    const mcqOptionDescription = mcq_questions?.map(title => title?.description)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Link variant="outline">
                    <Eye size={18} />
                </Link>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[80%] md:max-w-[60%] border border-gray-400 ">
                <DialogHeader>

                    <p className="text-2xl mb-3 " >
                        {parseHtmlContent(title)}
                    </p>


                    <div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                            {
                                mcq_questions?.map((option, index) => <li key={option.id} className="flex items-center gap-3 border rounded-sm p-2 " >
                                    <p className="h-8 w-8 flex items-center justify-center border rounded-full" >{index + 1}</p>
                                    <p>
                                        {parseHtmlContent(option.mcq_question_text)}
                                    </p>
                                </li>)
                            }
                        </ul>
                    </div>

                    {/* <div>
                        {type === "mcq" ? <div>
                            {<div className="">
                                <ul className="text-sm space-y-1 mb-2 "
                                >
                                    {mcq_questions?.map((option) => <li key={option.id} className="list-decimal ml-5  " >
                                        <p>{index+1} </p>
                                        {parseHtmlContent(option?.mcq_question_text)} </li>)}
                                </ul>
                            </div>}
                        </div>
                            : type === "creative" ? <div>
                                {<div className="">
                                    <ul className="text-sm"
                                    >
                                        {creative_questions?.map((question, index) => <li key={index} className="list-decimal ml-5 " > {parseHtmlContent(question?.creative_question_text)} </li>)}
                                    </ul>
                                </div>}
                            </div> : ""}
                    </div> */}

                    {/* <div className="flex items-start gap-2">
                        <span className="font-medium">Description:</span>
                        <span  >
                            {parseHtmlContent(title)}
                        </span>
                    </div> */}

                    <div className="text-xs flex items-center gap-3 pt-4 ">
                        <p>Que ID: {id}</p>
                        <p className="border-l border-gray-400 pl-2">{is_paid === 0 ? "Not paid" : "paid"}</p>
                        <p className="border-l border-gray-400  pl-2">{mark} Marks </p>
                        <p className="border-l border-gray-400  pl-2">{is_featured === 0 ? "Not featured" : "featured"}</p>
                        <p className="border-l border-gray-400  pl-2 capitalize"> <span className={`${type === "mcq" ? "uppercase" : "capitalize"}`} > {type}  </span>question</p>
                    </div>
                    {/* <div className="text-sm ">
                        <div id="section" className="mt-1">
                            <p><span className="font-medium">Section:</span>  &rarr; exam-type &rarr; exam sub-type</p>
                        </div>
                        <div id="group" className="mb-2">
                            <p> <span className="font-medium"> Group: </span> &rarr; level &rarr; subject &rarr; exam topic &rarr; exam sub-topic</p>
                        </div>
                    </div> */}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}