import {useCallback, useEffect, useState} from "react";
import {
    getTriviaCategories,
    getTriviaStatistics,
    groupQuestionsDistribution, questionsCacheKey
} from "../repository/triviaRepository.ts";
import type {Category} from "../models/category.ts";
import type {TriviaStatistics} from "../models/triviaStatistics.ts";
import type {Question} from "../models/question.ts";
import {TriviaApiError} from "../api/triviaApiError.ts";

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
    // When the value is null it means that the user selected a category from the drop-down
    // Meaning local selected is disabled
    const [localCategorySelected, setLocalCategorySelected] = useState<boolean | null>(false);

    // Error that was thrown and caught, we should set the flat to 'error' when we want to change this value
    const [error, setError] = useState<null | Error>(null);

    const [snackbarMessage, setSnackbarMessage] = useState<string | null>();


    useEffect(() => {
        // Fetches all categories
        const initialCategoryFetch = async () => {
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

        // On first load, we get all categories, and we load the data for the graphs
        initialCategoryFetch();
        getNewTriviaStatistics()
    }, [])

    // Calls the api for new questions. It also accepts categoryId parameter in order to get 50 questions
    // for that category. If it's null, it means 'any category' is selected
    const getNewTriviaStatistics = useCallback(async (categoryId?: number) => {
        if (triviaStatus === 'error') setTriviaStatus("loading");

        setStatisticsLoading(true);

        const result = await getTriviaStatistics(categoryId);
        if (result.isErr) {
            if (!(result.error instanceof TriviaApiError && result.error.status === 5)) {
                setTriviaStatus("error");
                setError(result.error)
                return;
            }

            // If we get status 5 error, it means that we didn't find selected category in cache
            // Then we will load the "any-category" cache and inform the user
            const cached = localStorage.getItem(questionsCacheKey());
            if (!cached) {
                setTriviaStatus("error");
                setError(result.error)
                return;
            }
            const questions = JSON.parse(cached);
            const [byCategory, byDifficulty] = groupQuestionsDistribution(questions);
            const statistics: TriviaStatistics = {
                questions: questions,
                distribution: {
                    byCategory,
                    byDifficulty,
                }
            }
            setTriviaStatistics(statistics);
            setTriviaStatus("loaded");
            setSelectedCategory(anyCategory);
            setLocalCategorySelected(false);
            setSnackbarMessage("Too many requests. Showing cached data from 'Any Category'. Please wait a few seconds before selecting another category.");
            setStatisticsLoading(false);
            return;
        }

        const dist = result.value;

        setTriviaStatistics(dist);
        setTriviaStatus("loaded");
        if (!categoryId) {
            setSelectedCategory(anyCategory);
            setLocalCategorySelected(false);
        } else {
            setLocalCategorySelected(null);
        }
        setStatisticsLoading(false);
    }, [triviaStatus]);


    // Used as local filter, it selects the category from the graph and groups the data for the graphs
    // while only using the questions with the selected category
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


    // It's used to select the category from the drop-down menu, and it also calls the function
    // to fetch new questions with that category
    const selectCategory = useCallback(async (categoryId: number) => {
        const category = categories.find(cat => cat.id === categoryId) ?? anyCategory;
        setSelectedCategory(category);

        const categoryToSend = categoryId === anyCategory.id ? undefined : categoryId;
        await getNewTriviaStatistics(categoryToSend);
    }, [categories, getNewTriviaStatistics])

    return {
        triviaStatus,
        categories,
        selectedCategory,
        selectCategory,
        statisticsLoading,
        triviaStatistics,
        getNewTriviaStatistics,
        selectLocalCategory,
        localCategorySelected,
        snackbarMessage,
        setSnackbarMessage,
        error,
    };
}