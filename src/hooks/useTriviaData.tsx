import {useCallback, useEffect, useState} from "react";
import {
    getTriviaCategories,
    getTriviaDistributions,
    groupQuestionsDistribution
} from "../repository/triviaRepository.ts";
import type {Category} from "../models/category.ts";
import type {TriviaStatistics} from "../models/triviaStatistics.ts";
import type {Question} from "../models/question.ts";

export type TriviaStatus = "initial" | "loading" | "loaded" | "error";

const anyCategory = {
    id: -1,
        name: "Any Category",
}

export function useTriviaData() {

    // Status for this view-model, loading is only used when the page first opens up and the
    // Trivia categories and statistics need to be loaded
    const [triviaStatus, setTriviaStatus] = useState<TriviaStatus>("initial");

    // Trivia categories
    const [categories, setCategories] = useState<Category[]>([]);

    // Selected category from the drop-down list
    const [selectedCategory, setSelectedCategory] = useState<Category>(anyCategory);

    // Flag to indicate statistics loading, it will only be true when you manually fetch new trivia data
    const [statisticsLoading, setStatisticsLoading] = useState(false);

    // Statistics, includes all questions fetched as well as calculated distributions
    const [triviaStatistics, setTriviaStatistics] = useState<TriviaStatistics | undefined>();

    // Flag to indicate if the local category is selected, when you click the bar on the bar chart
    const [localCategorySelected, setLocalCategorySelected] = useState<boolean>(false);

    // Error that was thrown and caught, we should set the flat to 'error' when we want to change this value
    const [error, setError] = useState<null | Error>(null);


    useEffect(() => {
        const initialFetch = async () => {
            setTriviaStatus("loading");

            const result = await getTriviaCategories();
            if (result.isErr) {
                setError(result.error);
                setTriviaStatus("error");
                return;
            }
            const cats = result.value;
            setCategories([anyCategory, ...cats]);

            setTriviaStatus("loaded");
        };

        initialFetch();
    }, [])

    const getNewTriviaDistributions = useCallback(async () => {
        if(triviaStatus === 'error') setTriviaStatus("loading");

        setStatisticsLoading(true);

        const result = await getTriviaDistributions();
        if (result.isErr) {
            setTriviaStatus("error");
            setError(result.error)
            return;
        }

        const dist = result.value;

        setTriviaStatistics(dist);
        setTriviaStatus("loaded");
        setStatisticsLoading(false);
    }, [triviaStatus])

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
        const category = categories.find(cat => cat.id === categoryId) ?? anyCategory;
        setSelectedCategory(category);
    }

    return {
        triviaStatus,
        categories,
        selectedCategory,
        selectCategory,
        statisticsLoading,
        triviaStatistics,
        getNewTriviaDistributions,
        selectLocalCategory,
        localCategorySelected,
        error,
    };
}