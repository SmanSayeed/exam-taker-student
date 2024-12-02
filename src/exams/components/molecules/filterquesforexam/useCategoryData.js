import { useGetCategoryQuery } from "@/features/categories/categoriesApi";
import { useState } from "react";

export const useCategoryData = (category) => {
  const {data: categoriesData, isLoading, error} = useGetCategoryQuery(category);
  const [categoryData, setCategoryData] = useState(null);

  return {
    categories: categoriesData?.data?.data,
    categoryData,
    setCategoryData,
    isLoading,
    error,
  };
};
