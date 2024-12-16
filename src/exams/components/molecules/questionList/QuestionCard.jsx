import { Card } from "@/components/ui/card";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import TagsTitle from "./TagsTitle";
import { ViewModal } from "./ViewModal";

export default function QuestionCard({ data: questionData, refetch }) {
  const { id, title, mcq_questions, tags, images } = questionData || {};

  const tagIds = tags ? tags.split(",").map(tagId => parseInt(tagId, 10)) : [];

  return (
    <Card className="p-4 pr-10 relative group shadow-md my3 hover:shadow-lg duration-500">
      <span className="text-xs font-semibold absolute top-0 left-0 px-2 py-0 rounded-br bg-gray-400 text-primary-foreground ">
        #{id}
      </span>

      {/* diaplay question title and tagnames */}
      <div className="mb-4">
        <p className="my-4 text-lg dark:text-white">
          {parseHtmlContent(title)}
        </p>

        <div className="flex flex-wrap gap-2 justify-end">
          {tagIds.map((tagId) => (
            <TagsTitle
              key={tagId}
              tagId={tagId}
            />
          ))}
        </div>
      </div>

      {/* Render the image if available */}
      {images && (
        <div className="my-4">
          <img
            src={images}
            alt={`Image for question ${id}`}
            className="rounded-md shadow-md max-w-full"
          />
        </div>
      )}

      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          {mcq_questions?.map((option, index) => (
            <li
              key={option.id}
              className="flex items-center gap-3 border rounded-sm p-2 "
            >
              <p className="h-8 w-8 flex items-center justify-center border rounded-full">
                {index + 1}
              </p>
              <p>{parseHtmlContent(option.mcq_question_text)}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-3 right-3 flex flex-col items-center gap-4">
        <button>
          <ViewModal data={questionData} tagIds={tagIds} />
        </button>
      </div>
    </Card>
  );
}
