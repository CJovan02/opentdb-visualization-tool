import {useEffect, useState} from "react";
import {getTriviaCategories} from "../repository/triviaRepository.ts";
import type {Category} from "../models/category.ts";

export function useTriviaData() {
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setCategoriesLoading(true);

            const cats = await getTriviaCategories();
            setCategories(cats);

            // we select the first category when they are loaded
            setSelectedCategory(cats[0]);

            setCategoriesLoading(false);
        };

        fetchCategories();
    }, [])


    function selectCategory(categoryId: number) {
        if (selectedCategory?.id === categoryId) {
            setSelectedCategory(null);
        } else {
            const category = categories.find(cat => cat.id === categoryId) ?? null;
            setSelectedCategory(category);
        }
    }

    return {categoriesLoading, categories, selectedCategory, selectCategory};
}