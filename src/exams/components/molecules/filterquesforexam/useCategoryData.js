import { fetchCategoryData } from "@/exams/features/categories/categorySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useCategoryData = (category) => {
  const dispatch = useDispatch();

  const { categories, isLoading, error } = useSelector((state) => state.category);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    if (category && !categories[category]) {
      // If data is not cached, fetch it
      dispatch(fetchCategoryData(category));
    }
  }, [category, dispatch, categories]);

  return {
    categories: categories[category] || [],
    categoryData,
    setCategoryData,
    isLoading,
    error,
  };
};
