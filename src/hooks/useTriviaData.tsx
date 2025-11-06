import {useCallback, useEffect, useState} from "react";
import {
    getTriviaCategories,
    getTriviaDistributions,
    groupQuestionsDistribution
} from "../repository/triviaRepository.ts";
import type {Category} from "../models/category.ts";
import type {TriviaStatistics} from "../models/triviaStatistics.ts";
import type {Question} from "../models/question.ts";

// TODO error handling

export function useTriviaData() {
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [distributionsLoading, setDistributionsLoading] = useState(false);
    const [triviaStatistics, setTriviaStatistics] = useState<TriviaStatistics | undefined>();
    const [localCategorySelected, setLocalCategorySelected] = useState<boolean>(false);

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
        setTriviaStatistics(dist);
        setDistributionsLoading(false);
    }, [])

    useEffect(() => {
        fetchCategories();
    }, [])

    const selectLocalCategory = useCallback((category: string) => {
        if (triviaStatistics === undefined) return;

        let newQuestions: Question[];

        if (!localCategorySelected) {
            setLocalCategorySelected(true);
            newQuestions =
                triviaStatistics.questions.filter((question) => question.category === category);
        } else {
            setLocalCategorySelected(false);
            newQuestions = triviaStatistics.questions;
        }

        const [categoryDist, difficultyDist] = groupQuestionsDistribution(newQuestions);

        setTriviaStatistics(prev => prev ? {
            ...prev,
            distribution: {
                byCategory: categoryDist,
                byDifficulty: difficultyDist,
            },
        } : prev);
    }, [triviaStatistics, localCategorySelected]);


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
        triviaStatistics,
        getNewTriviaDistributions,
        selectLocalCategory,
        localCategorySelected,
    };
}