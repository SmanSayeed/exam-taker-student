import FilteringExamsForCategories from "../molecules/FilteringExamsForCategories";

export default function CategoriesExam() {
  return (
      <div className="h-full min-h-20 ">
          <div>
              <FilteringExamsForCategories />
          </div>

          {/* <div className="refresh-and-search w-full ">
              <FilterQuestionsBySearch />
          </div> */}
      </div>
  )
}
