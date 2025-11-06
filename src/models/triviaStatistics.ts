import type {Question} from "./question.ts";

export type TriviaStatistics = {
    questions: Question[];
    distribution: {
        byCategory: CategoryDistribution[];
        byDifficulty: DifficultyDistribution[];
    }
}

export type CategoryDistribution = {
    category: string;
    questionCount: number;
}

export type DifficultyDistribution = {
    difficulty: string;
    questionCount: number;
}