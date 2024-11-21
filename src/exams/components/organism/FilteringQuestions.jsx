import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import FilterQuestionsByCategory from "../molecules/questionList/FilterQuestionsByCategory";

export default function FilteringQuestions({ control, setValue, refetch, handleFilterQuestions, register, handleSubmit, errors, isLoadingGetQuestions }) {

  return (
    <form
      onSubmit={handleSubmit(handleFilterQuestions)}
      className="relative h-full min-h-20"
    >
      <div className="mb-4">
        {/* Filter Options */}
        <FilterQuestionsByCategory control={control} setValue={setValue} />
      </div>

      <div className="relative mb-4">
        {/* Search Input */}
        <Input
          placeholder="Search questions..."
          {...register("keyword")}
          className="pr-10"
        />
        <button type="submit" className="absolute right-2 top-1/4">
          <Search size={18} className="opacity-70" />
        </button>
      </div>

      <div className="mb-4 text-end">
        <Button type="submit" disabled={isLoadingGetQuestions}>
          {
            isLoadingGetQuestions ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </span>
            ) : "Filtered"
          }
        </Button>
      </div>
    </form>
  );
}
