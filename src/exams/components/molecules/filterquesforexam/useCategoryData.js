import { useGetCategoryQuery } from "@/exams/features/api/apiSlice";
import { useState } from "react";

export const useCategoryData = (category) => {
  // const dispatch = useDispatch();

  // const { categories, isLoading, error } = useSelector((state) => state.category);
  const {data: categoriesData, isLoading, error} = useGetCategoryQuery(category);
  const [categoryData, setCategoryData] = useState(null);

  // useEffect(() => {
  //   if (category && !categories[category]) {
  //     // If data is not cached, fetch it
  //     dispatch(fetchCategoryData(category));
  //   }
  // }, [category, dispatch, categories]);

  return {
    // categories: categories[category] || [],
    categories: categoriesData?.data?.data,
    categoryData,
    setCategoryData,
    isLoading,
    error,
  };
};
