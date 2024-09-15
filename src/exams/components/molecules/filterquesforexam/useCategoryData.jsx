import { useGetQuestionsCategoryQuery } from "@/exams/features/questions/questionsCategoryApi";
import { useState } from "react";

export const useCategoryData = (category) => {
    const { data, isLoading, error } = useGetQuestionsCategoryQuery(category);
    const [categoryData, setCategoryData] = useState(null);

    return { 
        data: data?.data?.data || [], 
        isLoading, 
        error, 
        categoryData, 
        setCategoryData 
    };
};