import axios from "axios";
import { useEffect, useState } from "react";

export const useCategoryDataCopy = (category) => {

    const [categories, setCategories] = useState([]);
    const [categoryData, setCategoryData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseURL = import.meta.env.VITE_SERVER_BASE_URL_2;

    useEffect(() => {
        const fetchCategoryData = async () => {
            setIsLoading(true);

            try {
                const storedAuth = localStorage.getItem("auth");
                const auth = storedAuth ? JSON.parse(storedAuth) : null;
                const token = auth?.token;

                if (!token) {
                    throw new Error("No authentication token found");
                }

                const response = await axios.get(`${baseURL}/questions/${category}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const fetchedData = response.data?.data?.data || [];
                setCategories(fetchedData);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (category) {
            fetchCategoryData();
        }
    }, [category, baseURL]);

    return {
        categoryData,
        isLoading,
        error,
        setCategoryData,
        categories,
        setCategories
    };
};
