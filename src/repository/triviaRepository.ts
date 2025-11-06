import type {Category} from "../models/category.ts";
import {fetchCategories, fetchQuestions} from "../api/triviaApi.ts";
import type {CategoryDistribution, DifficultyDistribution, TriviaStatistics} from "../models/triviaStatistics.ts";
import type {Question} from "../models/question.ts";
import {Err, Ok, type Result} from "../utils/result.ts";
import {TriviaApiError} from "../api/triviaApiError.ts";

export async function getTriviaCategories(): Promise<Result<Category[]>> {
    return await fetchCategories();
}

export async function getTriviaDistributions(): Promise<Result<TriviaStatistics>> {
    const result = await fetchQuestions();

    // We check if it's trivia api error with the code 5, which means we sent too many requests
    // Then we need to try and load the data from some sort of cache
    if (result.isErr) {
        if (result.error instanceof TriviaApiError && result.error.status === 5) {
            // Load previous questions from cache
        }

        return Err.of(result.error);
    }
    const questions = result.value;

    const [categoryDist, difficultyDist] = groupQuestionsDistribution(questions);

    return Ok.of({
        questions, distribution: {
            byCategory: categoryDist, byDifficulty: difficultyDist
        }
    } as TriviaStatistics);
}

export function groupQuestionsDistribution(questions: Question[]): [CategoryDistribution[], DifficultyDistribution[]] {
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

    return [categoryDist, difficultyDist];
}
