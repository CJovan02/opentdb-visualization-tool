export type Question = {
    type: 'multiple' | 'boolean';
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
}