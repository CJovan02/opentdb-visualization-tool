export type TriviaDistribution = {
    byCategory: CategoryDistribution[];
    byDifficulty: DifficultyDistribution[];
}

export type CategoryDistribution = {
    category: string;
    questionCount: number;
}

export type DifficultyDistribution = {
    difficulty: string;
    questionCount: number;
}