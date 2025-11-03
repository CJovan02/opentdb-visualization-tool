import {useEffect, useState} from "react";
import {getTriviaCategories} from "../repository/triviaRepository.ts";
import type {Category} from "../models/category.ts";

export function useTriviaData() {
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            setCategoriesLoading(true);
            const cats = await getTriviaCategories();
            setCategories(cats);
        };

        fetchCategories();
    }, [])

    return {categoriesLoading, categories};
}