import {useCallback, useEffect, useState} from "react";
import {getTriviaCategories, getTriviaDistributions} from "../repository/triviaRepository.ts";
import type {Category} from "../models/category.ts";
import type {TriviaDistribution} from "../models/triviaDistribution.ts";

// TODO error handling

export function useTriviaData() {
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [distributionsLoading, setDistributionsLoading] = useState(false);
    const [triviaDist, setTriviaDist] = useState<TriviaDistribution | undefined>();

    const fetchCategories = async () => {
        setCategoriesLoading(true);

        const cats = await getTriviaCategories();
        setCategories(cats);

        // we select the first category when they are loaded
        setSelectedCategory(cats[0]);

        setCategoriesLoading(false);
    };

    const getNewTriviaDistributions = useCallback(async () => {
        setDistributionsLoading(true);
        const dist = await getTriviaDistributions();
        setTriviaDist(dist);
        setDistributionsLoading(false);
    }, [])

    useEffect(() => {
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

    return {
        categoriesLoading,
        categories,
        selectedCategory,
        selectCategory,
        distributionsLoading,
        triviaDist,
        getNewTriviaDistributions
    };
}