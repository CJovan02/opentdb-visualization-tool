import type {Category} from "../models/category.ts";
import {fetchCategories, fetchQuestions} from "../api/triviaApi.ts";
import type {CategoryDistribution, DifficultyDistribution, TriviaDistribution} from "../models/triviaDistribution.ts";

// TODO error handling

export async function getTriviaCategories(): Promise<Category[]> {
    return await fetchCategories();
}

export async function getTriviaDistributions(): Promise<TriviaDistribution> {
    const questions = await fetchQuestions();

    // We use record/map for quick lookup O(1) when counting questions for each category or difficulty
    const categoriesMap: Record<string, number> = {};
    const difficultyMap: Record<string, number> = {};

    questions.forEach((question) => {
        categoriesMap[question.category] = (categoriesMap[question.category] ?? 0) + 1;
        difficultyMap[question.difficulty] = (difficultyMap[question.difficulty] ?? 0) + 1;
    })

    // Then we convert each map to array of objects in order to prepare it for use of the Recharts
    const categoryDist: CategoryDistribution[] = Object.entries(categoriesMap).map(
        ([category, questionCount]) => ({category, questionCount})
    )
    const difficultyDist: DifficultyDistribution[] = Object.entries(difficultyMap).map(
        ([difficulty, questionCount]) => ({difficulty, questionCount})
    )

    return {byCategory: categoryDist, byDifficulty: difficultyDist} as TriviaDistribution;
}
